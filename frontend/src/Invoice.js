import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
        heading: "Invoice",
        address: [],
        date: '',
        items: [],
    generatePDF: function (sender, cost) {
        this.date = new Date().toLocaleDateString('en-GB');
        console.log(cost);
        this.address.push(sender.Company, sender.Address.name, sender.Address.country);
        const columns = [
        { title: "Description", dataKey: "title" },
        { title: "Price", dataKey: "body" }
        ];
        this.items.push({
            title: "Delivery", body: "€" + cost
        },{ title: "", body: "" },{ title: "", body: "" },
        { title: "Total", body: "€" + cost },
        )
        const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: [6, 6]
        });
        // text is placed using x, y coordinates
        doc.setFontSize(16).text(this.heading, 0.5, 1.0);
        doc.setFontSize(12).text(this.date, 4, 1.0);
        // create a line under heading 
        doc.setLineWidth(0.01).line(0.5, 1.1, 5.5, 1.1);
        // Using autoTable plugin
        doc.setFontSize(12).text(this.address, 0.5, 1.5, { align: "left", maxWidth: "7.5" });
        this.address = [];
        doc.autoTable({
        columns,
        body: this.items,
        margin: { left: 0.5, top: 2.5 }
        });
        
        // Creating footer and saving file
        doc
        .setTextColor(0, 0, 255)
        .text(
            "Please pay this invoice within 30 days",
            0.5,
            doc.internal.pageSize.height - 0.5
        )
        .save(`${this.heading}.pdf`);
    }
    
}
