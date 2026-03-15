const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, BorderStyle, WidthType, ShadingType, ImageRun } = require('docx');

const logoBuffer = fs.readFileSync('/home/claude/us-business/templates/logo.png');

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0 };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };
const accentColor = "1B4F72";

function createInvoice() {
  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Calibri", size: 20 } } }
    },
    sections: [{
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 720, right: 1080, bottom: 720, left: 1080 }
        }
      },
      children: [
        // HEADER with logo
        new Table({
          width: { size: 10080, type: WidthType.DXA },
          columnWidths: [1400, 4600, 4080],
          rows: [
            new TableRow({
              children: [
                // Logo
                new TableCell({
                  borders: noBorders,
                  width: { size: 1400, type: WidthType.DXA },
                  verticalAlign: "center",
                  children: [
                    new Paragraph({
                      children: [
                        new ImageRun({
                          data: logoBuffer,
                          transformation: { width: 75, height: 87 },
                          type: "png",
                        }),
                      ]
                    }),
                  ]
                }),
                // Company info
                new TableCell({
                  borders: noBorders,
                  width: { size: 4600, type: WidthType.DXA },
                  verticalAlign: "center",
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: "DM TRADE SOLUTIONS LLC", font: "Calibri", size: 26, bold: true, color: accentColor })]
                    }),
                    new Paragraph({ spacing: { before: 30 }, children: [new TextRun({ text: "8 The Green, Ste D, Dover, DE 19901", size: 17, color: "555555" })] }),
                    new Paragraph({ children: [new TextRun({ text: "EIN: 41-3226623", size: 17, color: "555555" })] }),
                    new Paragraph({ children: [new TextRun({ text: "www.dmtrade.solutions", size: 17, color: accentColor })] }),
                    new Paragraph({ children: [new TextRun({ text: "info@dmtrade.solutions", size: 17, color: accentColor })] }),
                  ]
                }),
                // INVOICE title
                new TableCell({
                  borders: noBorders,
                  width: { size: 4080, type: WidthType.DXA },
                  verticalAlign: "center",
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.RIGHT,
                      children: [new TextRun({ text: "INVOICE", font: "Calibri", size: 52, bold: true, color: accentColor })]
                    }),
                  ]
                }),
              ]
            })
          ]
        }),

        new Paragraph({ spacing: { before: 200, after: 200 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: accentColor, space: 1 } }, children: [] }),

        // BILL TO + INVOICE INFO
        new Table({
          width: { size: 10080, type: WidthType.DXA },
          columnWidths: [5040, 5040],
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  borders: noBorders, width: { size: 5040, type: WidthType.DXA },
                  children: [
                    new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: "BILL TO:", size: 18, bold: true, color: accentColor })] }),
                    new Paragraph({ children: [new TextRun({ text: "[Customer Name]", size: 20, color: "333333" })] }),
                    new Paragraph({ children: [new TextRun({ text: "[Address Line 1]", size: 18, color: "666666" })] }),
                    new Paragraph({ children: [new TextRun({ text: "[City, State ZIP]", size: 18, color: "666666" })] }),
                    new Paragraph({ children: [new TextRun({ text: "[Email / Phone]", size: 18, color: "666666" })] }),
                  ]
                }),
                new TableCell({
                  borders: noBorders, width: { size: 5040, type: WidthType.DXA },
                  children: [
                    new Table({
                      width: { size: 4800, type: WidthType.DXA },
                      columnWidths: [2400, 2400],
                      rows: [
                        makeInfoRow("Invoice #:", "INV-2026-001"),
                        makeInfoRow("Date:", "MM/DD/2026"),
                        makeInfoRow("Due Date:", "Upon Receipt"),
                        makeInfoRow("Payment:", "Zelle"),
                      ]
                    })
                  ]
                }),
              ]
            })
          ]
        }),

        new Paragraph({ spacing: { before: 300 }, children: [] }),

        // LINE ITEMS
        new Table({
          width: { size: 10080, type: WidthType.DXA },
          columnWidths: [600, 4280, 1200, 1200, 1200, 1600],
          rows: [
            new TableRow({ children: [
              makeHeaderCell("#", 600), makeHeaderCell("Description", 4280, AlignmentType.LEFT),
              makeHeaderCell("Qty", 1200), makeHeaderCell("Unit", 1200),
              makeHeaderCell("Price", 1200), makeHeaderCell("Amount", 1600),
            ]}),
            makeItemRow("1", "Laboratory equipment / part description", "1", "pcs", "$0.00", "$0.00"),
            makeItemRow("2", "", "", "", "$0.00", "$0.00"),
            makeItemRow("3", "", "", "", "$0.00", "$0.00"),
            makeItemRow("4", "", "", "", "$0.00", "$0.00"),
            makeItemRow("5", "", "", "", "$0.00", "$0.00"),
          ]
        }),

        // TOTALS
        new Table({
          width: { size: 10080, type: WidthType.DXA },
          columnWidths: [6080, 2400, 1600],
          rows: [
            makeTotalRow("Subtotal:", "$0.00", false),
            makeTotalRow("Tax (0%):", "$0.00", false),
            makeTotalRow("Shipping:", "$0.00", false),
            makeTotalRow("TOTAL:", "$0.00", true),
          ]
        }),

        new Paragraph({ spacing: { before: 400 }, children: [] }),

        new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: "PAYMENT INFORMATION", size: 20, bold: true, color: accentColor })] }),
        new Paragraph({ children: [new TextRun({ text: "Payment accepted via Zelle to the business account of DM Trade Solutions LLC.", size: 18, color: "444444" })] }),
        new Paragraph({ spacing: { before: 60 }, children: [new TextRun({ text: "Please reference the invoice number in your Zelle payment memo.", size: 18, color: "444444" })] }),

        new Paragraph({ spacing: { before: 300 }, children: [] }),

        new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: "TERMS & CONDITIONS", size: 20, bold: true, color: accentColor })] }),
        new Paragraph({ children: [new TextRun({ text: "All sales are final unless otherwise agreed in writing. Equipment sold as-is unless warranty is explicitly stated. Full terms available at www.dmtrade.solutions.", size: 18, color: "444444" })] }),

        new Paragraph({ spacing: { before: 200 }, children: [] }),

        new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: "DELIVERY METHOD", size: 20, bold: true, color: accentColor })] }),
        new Paragraph({ children: [
          new TextRun({ text: "[ ] ", size: 18, font: "Courier New" }),
          new TextRun({ text: "Shipping (tracking # _______________)", size: 18, color: "444444" }),
        ]}),
        new Paragraph({ children: [
          new TextRun({ text: "[ ] ", size: 18, font: "Courier New" }),
          new TextRun({ text: "Customer pickup   Date: _______________", size: 18, color: "444444" }),
        ]}),

        new Paragraph({ spacing: { before: 400 }, border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: "CCCCCC", space: 1 } }, children: [] }),
        new Paragraph({ spacing: { before: 100 }, alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Thank you for your business!", size: 18, italics: true, color: "888888" })]
        }),
        new Paragraph({ alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "DM Trade Solutions LLC  |  www.dmtrade.solutions  |  info@dmtrade.solutions", size: 16, color: "AAAAAA" })]
        }),
      ]
    }]
  });
  return doc;
}

function makeInfoRow(label, value) {
  return new TableRow({ children: [
    new TableCell({ borders: noBorders, width: { size: 2400, type: WidthType.DXA }, margins: { top: 30, bottom: 30, left: 80, right: 40 },
      children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: label, size: 18, bold: true, color: "555555" })] })] }),
    new TableCell({ borders: noBorders, width: { size: 2400, type: WidthType.DXA }, margins: { top: 30, bottom: 30, left: 80, right: 40 },
      children: [new Paragraph({ children: [new TextRun({ text: value, size: 20, color: "333333" })] })] }),
  ]});
}
function makeHeaderCell(text, width, align = AlignmentType.CENTER) {
  return new TableCell({
    borders, width: { size: width, type: WidthType.DXA },
    shading: { fill: accentColor, type: ShadingType.CLEAR },
    margins: cellMargins, verticalAlign: "center",
    children: [new Paragraph({ alignment: align, children: [new TextRun({ text, size: 18, bold: true, color: "FFFFFF", font: "Calibri" })] })]
  });
}
function makeItemRow(num, desc, qty, unit, price, amount) {
  const cells = [
    { text: num, width: 600, align: AlignmentType.CENTER },
    { text: desc, width: 4280, align: AlignmentType.LEFT },
    { text: qty, width: 1200, align: AlignmentType.CENTER },
    { text: unit, width: 1200, align: AlignmentType.CENTER },
    { text: price, width: 1200, align: AlignmentType.RIGHT },
    { text: amount, width: 1600, align: AlignmentType.RIGHT },
  ];
  return new TableRow({
    children: cells.map(c => new TableCell({
      borders, width: { size: c.width, type: WidthType.DXA }, margins: cellMargins,
      children: [new Paragraph({ alignment: c.align, children: [new TextRun({ text: c.text, size: 19, color: "333333" })] })]
    }))
  });
}
function makeTotalRow(label, value, isBold) {
  return new TableRow({ children: [
    new TableCell({ borders: noBorders, width: { size: 6080, type: WidthType.DXA }, children: [new Paragraph({ children: [] })] }),
    new TableCell({
      borders: { top: noBorder, bottom: isBold ? { style: BorderStyle.DOUBLE, size: 3, color: accentColor } : noBorder, left: noBorder, right: noBorder },
      width: { size: 2400, type: WidthType.DXA }, margins: { top: 40, bottom: 40, left: 80, right: 80 },
      children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: label, size: isBold ? 22 : 19, bold: isBold, color: isBold ? accentColor : "555555" })] })]
    }),
    new TableCell({
      borders: { top: noBorder, bottom: isBold ? { style: BorderStyle.DOUBLE, size: 3, color: accentColor } : noBorder, left: noBorder, right: noBorder },
      width: { size: 1600, type: WidthType.DXA }, margins: { top: 40, bottom: 40, left: 80, right: 80 },
      children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: value, size: isBold ? 22 : 19, bold: isBold, color: isBold ? accentColor : "333333" })] })]
    }),
  ]});
}

Packer.toBuffer(createInvoice()).then(buffer => {
  fs.writeFileSync("/home/claude/us-business/templates/invoice_template.docx", buffer);
  console.log("Invoice v3 with logo created");
});
