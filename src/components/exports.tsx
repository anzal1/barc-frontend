import dayjs from 'dayjs'
import ExcelJS from 'exceljs'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

export type LogType = {
	logID: number
	device_Name: string
	device_Location: string
	activity: string
	user_name: string
	entryDate: string

	log_Discription: string
}

export const handleCsvExport = (data: LogType[]) => {
	window.open(
		`data:text/csv;charset=utf-8,${encodeURIComponent(
			data.reduce(
				(acc, curr, idx) =>
					`${acc}${idx + 1},${curr.device_Name},${curr.device_Location},${curr.activity},${curr.user_name},${dayjs(curr.entryDate).format('DD/MM/YYYY HH:mm:ss A')}\n`,
				'sl.No,Device Name,Location,Activity,by whom,Activity Date\n'
			)
		)}`,
		'_blank'
	)
}

export const handleExcelExport = async (data: LogType[]) => {
	const workbook = new ExcelJS.Workbook()
	const worksheet = workbook.addWorksheet('Report Data')

	const newData = data.map((d, idx) => ({
		slNo: idx + 1,
		'Device Name': d.device_Name,
		'Device Location': d.device_Location,
		Activity: d.activity,
		'by Whom': d.user_name,
		entryDate: dayjs(d.entryDate).format('DD/MM/YYYY HH:mm:ss A')
	}))

	const columns = Object.keys(newData[0]).map((key) => ({ header: key, key }))
	worksheet.columns = columns
	newData.forEach((item) => worksheet.addRow(item))
	const buffer = await workbook.xlsx.writeBuffer()
	const blob = new Blob([buffer], {
		type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
	})

	const link = document.createElement('a')
	link.href = URL.createObjectURL(blob)
	link.download = 'data.xlsx'

	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}

export const pdfExport = (data: LogType[]) => {
	const doc = new jsPDF()
	const tableColumn = [
		'Sl. No.',
		'Device Name',
		'Device Location',
		'Activity',
		'By whom',
		'Entry Date'
	]
	const tableRows: any[] = []

	data.forEach((item, idx) => {
		tableRows.push([
			idx + 1,
			item.device_Name,
			item.device_Location,
			item.activity,
			item.user_name,
			dayjs(item.entryDate).format('DD/MM/YYYY HH:mm:ss A')
		])
	})

	const pageWidth = doc.internal.pageSize.getWidth()
	const margin = 1
	const availableWidth = pageWidth - margin * 2

	// Calculate column widths ensuring minimum width of 150 and distribute remaining space
	const minColumnWidth = 5
	const totalMinWidth = minColumnWidth * tableColumn.length
	const remainingWidth = availableWidth > totalMinWidth ? availableWidth - totalMinWidth : 0
	const columnWidth =
		remainingWidth > 0 ? minColumnWidth + remainingWidth / tableColumn.length : minColumnWidth

	// @ts-ignore
	doc.autoTable({
		head: [tableColumn],
		body: tableRows,
		startY: 1,
		styles: { cellPadding: 2, fontSize: 8 },
		columnStyles: {
			0: { cellWidth: columnWidth },
			1: { cellWidth: columnWidth },
			2: { cellWidth: columnWidth },
			3: { cellWidth: columnWidth },
			4: { cellWidth: columnWidth }
		},
		margin: { left: margin, right: margin, top: margin, bottom: margin }
	})

	doc.save('download.pdf')
}
