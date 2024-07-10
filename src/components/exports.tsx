import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
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

type PdfExportProps = {
  data: any[]
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
})

export function PdfExport(props: PdfExportProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  )
}
