import dayjs from 'dayjs'
import ExcelJS from 'exceljs'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

export type LogType = {
	logID: number
	log_Discription: string
	user_name: string
	activity: string
	device_Location: string
	device_Name: string
	entryDate: string
}

export const handleCsvExport = (data: LogType[]) => {
	window.open(
		`data:text/csv;charset=utf-8,${encodeURIComponent(
			data.reduce(
				(acc, curr) =>
					`${acc}${curr.logID},${curr.user_name},${curr.activity},${dayjs(curr.entryDate).format('DD/MM/YYYY HH:mm:ss A')},${curr.device_Location},${curr.log_Discription}\n`,
				'logID,by whom,activity,entryDate,Location,Description\n'
			)
		)}`,
		'_blank'
	)
}

export const handleExcelExport = async (data: LogType[]) => {
	const workbook = new ExcelJS.Workbook()
	const worksheet = workbook.addWorksheet('My Data')

	const newData = data.map((d) => ({
		logID: d.logID,
		'by Whom': d.user_name,
		Activity: d.activity,
		entryDate: dayjs(d.entryDate).format('DD/MM/YYYY HH:mm:ss A'),
		'Device Location': d.device_Location,
		Description: d.log_Discription
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
		'Log ID',
		'By whom',
		'Activity',
		'Entry Date',
		'Device Location',
		'Description'
	]
	const tableRows: any[] = []

	data.forEach((item) => {
		tableRows.push([
			item.logID,
			item.user_name,
			item.activity,
			dayjs(item.entryDate).format('DD/MM/YYYY HH:mm:ss A'),
			item.device_Location,
			item.log_Discription
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
