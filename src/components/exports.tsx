import 'jspdf-autotable'
import { jsPDF } from 'jspdf'
import ExcelJS from 'exceljs'

export const handleCsvExport = (data: any[]) => {
  window.open(
    `data:text/csv;charset=utf-8,${encodeURIComponent(
      data.reduce((acc: any, report: any) => {
        return (
          acc +
          Object.values(report)
            .map((value) => `"${value}"`)
            .join(',') +
          '\n'
        )
      }, 'logID,log_Discription,user_name,activity,entryDate\n')
    )}`,
    '_blank'
  )
}

export const handleExcelExport = async (data: any[]) => {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('My Data')

  const columns = Object.keys(data[0]).map((key) => ({ header: key, key }))
  worksheet.columns = columns
  data.forEach((item) => worksheet.addRow(item))
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

export const pdfExport = (data: any[]) => {
  const doc = new jsPDF()
  const tableColumn = [
    'Log ID',
    'User Name',
    'Activity',
    'Entry Date',
    'Description'
  ]
  const tableRows: any[] = []

  data.forEach((item) => {
    tableRows.push([
      item.logID,
      item.user_name,
      item.activity,
      item.entryDate,
      item.log_Discription
    ])
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 1
  const availableWidth = pageWidth - margin * 2

  // Calculate column widths ensuring minimum width of 150 and distribute remaining space
  const minColumnWidth = 5
  const totalMinWidth = minColumnWidth * tableColumn.length
  const remainingWidth =
    availableWidth > totalMinWidth ? availableWidth - totalMinWidth : 0
  const columnWidth =
    remainingWidth > 0
      ? minColumnWidth + remainingWidth / tableColumn.length
      : minColumnWidth

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

  // Save the PDF
  doc.save('log_entries.pdf')
}
