
import { useState } from "react";
import { caseStudies } from "@/data/caseStudies";
import { useToast } from "@/components/ui/use-toast";

export const usePDFDownloader = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const downloadPDF = async () => {
    try {
      setIsGenerating(true);
      
      // Dynamically import jsPDF and html2canvas only when needed
      const [jsPDFModule, html2canvasModule] = await Promise.all([
        import('jspdf'),
        import('html2canvas')
      ]);
      
      const jsPDF = jsPDFModule.default;
      const html2canvas = html2canvasModule.default;
      
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });
      
      // Add title page
      doc.setFontSize(24);
      doc.setTextColor(108, 99, 255); // Media purple color
      doc.text("Mohamed Ali", 105, 80, { align: "center" });
      doc.setFontSize(16);
      doc.setTextColor(80, 80, 80);
      doc.text("Media Buying Portfolio", 105, 90, { align: "center" });
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text("Senior Media Buyer", 105, 100, { align: "center" });
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 110, { align: "center" });
      
      // Add case studies
      doc.addPage();
      doc.setFontSize(18);
      doc.setTextColor(60, 60, 60);
      doc.text("Case Studies", 20, 20);
      
      let yPosition = 35;
      
      // Loop through case studies
      for (let i = 0; i < caseStudies.length; i++) {
        const study = caseStudies[i];
        
        // Add new page if not enough space
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }
        
        // Add case study details
        doc.setFontSize(14);
        doc.setTextColor(80, 80, 80);
        doc.text(study.title, 20, yPosition);
        
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text(`Category: ${study.category}`, 20, yPosition + 7);
        doc.text(`Industry: ${study.industry}`, 20, yPosition + 14);
        
        const descriptionLines = doc.splitTextToSize(study.description, 170);
        doc.setFontSize(10);
        doc.text(descriptionLines, 20, yPosition + 21);
        
        // Add results
        const resultsYStart = yPosition + 21 + (descriptionLines.length * 5);
        doc.setFontSize(12);
        doc.setTextColor(108, 99, 255);
        doc.text("Results:", 20, resultsYStart);
        
        doc.setTextColor(80, 80, 80);
        doc.setFontSize(10);
        
        // Make sure metrics array exists before trying to iterate through it
        if (study.metrics) {
          study.metrics.forEach((metric, index) => {
            doc.text(`• ${metric.label}: ${metric.value}`, 25, resultsYStart + (index + 1) * 5);
          });
          
          // Update Y position for next case study
          yPosition = resultsYStart + (study.metrics.length + 1) * 5 + 15;
        } else {
          // If no metrics, just add some spacing
          yPosition = resultsYStart + 15;
        }
      }
      
      // Add contact information page
      doc.addPage();
      doc.setFontSize(18);
      doc.setTextColor(60, 60, 60);
      doc.text("Contact Information", 20, 20);
      
      doc.setFontSize(12);
      doc.setTextColor(80, 80, 80);
      doc.text("Mohamed Ali", 20, 35);
      doc.text("Senior Media Buyer", 20, 42);
      doc.text("Email: contact@mediamojomarketing.com", 20, 49);
      doc.text("LinkedIn: linkedin.com/in/mhmdali02", 20, 56);
      doc.text("Website: mediamojomarketing.com", 20, 63);
      
      // Save the PDF
      doc.save("Mohamed_Ali_Portfolio.pdf");
      
      toast({
        title: "Portfolio PDF downloaded",
        description: "Your portfolio PDF has been successfully generated.",
      });
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error generating PDF",
        description: "There was a problem generating your portfolio PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return { downloadPDF, isGenerating };
};
