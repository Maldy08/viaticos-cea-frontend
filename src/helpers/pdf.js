import {jsPDF} from "jspdf";

const doc = new jsPDF();


function footer(){
    doc.text('Direccion administrativa', 50, doc.internal.pageSize.height - 10)
}