import dayjs from 'dayjs'
import ExcelJS from 'exceljs'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

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

export const pdfExport = (data: LogType[], heading: string) => {
	const doc = new jsPDF()
	doc.setFontSize(12)
	doc.text(heading, 2, 6)

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

	const minColWidth = 5
	const totalMinWidth = minColWidth * tableColumn.length
	const remWidth = availableWidth > totalMinWidth ? availableWidth - totalMinWidth : 0
	const columnWidth = remWidth > 0 ? minColWidth + remWidth / tableColumn.length : minColWidth

	autoTable(doc, {
		head: [tableColumn],
		body: tableRows,
		startY: 10,
		styles: { cellPadding: 2, fontSize: 8 },
		columnStyles: {
			0: { cellWidth: 15 },
			1: { cellWidth: columnWidth },
			2: { cellWidth: columnWidth },
			3: { cellWidth: columnWidth + (2 * columnWidth - 37) },
			4: { cellWidth: 22 },
			5: { cellWidth: columnWidth }
		},
		margin: { left: margin, right: margin, top: margin, bottom: margin }
	})

	doc.save('download.pdf')
}
