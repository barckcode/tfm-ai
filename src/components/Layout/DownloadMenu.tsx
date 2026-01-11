import React, { useState, useRef, useEffect } from 'react';
import tourismData from '../../data/tourism_data.json';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ISLANDS_INFO } from '../../types/tourism';

interface DownloadMenuProps {
  selectedIsland: number | null;
  selectedYear: number | null;
  selectedMonth: number | null;
  filteredData: any[];
  aggregatedData: any;
}

export const DownloadMenu: React.FC<DownloadMenuProps> = ({
  selectedIsland,
  selectedYear,
  selectedMonth
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleDownloadJSON = () => {
    const dataStr = JSON.stringify(tourismData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'canarias_tourism_data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const handleDownloadPDF = async () => {
    try {
      setIsOpen(false);

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let yPosition = 20;

      // Header
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Informe de Turismo de Canarias', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 10;

      // Filter information
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      const filterLines: string[] = [];

      if (!selectedIsland && !selectedYear && !selectedMonth) {
        filterLines.push('Todos los Datos (Sin Filtros Aplicados)');
      } else {
        filterLines.push('Filtros Activos:');
        if (selectedIsland) {
          const island = ISLANDS_INFO.find(i => i.code === selectedIsland);
          filterLines.push(`  • Isla: ${island?.name || 'Desconocida'}`);
        }
        if (selectedYear) {
          filterLines.push(`  • Año: ${selectedYear}`);
        }
        if (selectedMonth) {
          const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                             'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
          filterLines.push(`  • Mes: ${monthNames[selectedMonth - 1]}`);
        }
      }

      filterLines.forEach(line => {
        pdf.text(line, 20, yPosition);
        yPosition += 7;
      });

      yPosition += 5;

      // Capture charts
      const cards = document.querySelectorAll('.card');

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i] as HTMLElement;

        // Skip elements marked to be excluded from PDF
        if (card.hasAttribute('data-exclude-pdf')) continue;

        try {
          const canvas = await html2canvas(card, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#1e293b', // volcanic-800
          });

          const imgData = canvas.toDataURL('image/png');
          const imgWidth = pageWidth - 40; // 20mm margin on each side
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          // Check if we need a new page
          if (yPosition + imgHeight > pageHeight - 20) {
            pdf.addPage();
            yPosition = 20;
          }

          pdf.addImage(imgData, 'PNG', 20, yPosition, imgWidth, imgHeight);
          yPosition += imgHeight + 10;

        } catch (error) {
          console.error('Error capturing chart:', error);
        }
      }

      // Footer
      const reportDate = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'italic');
      const footerY = pdf.internal.pageSize.getHeight() - 10;
      pdf.text(`Generado el ${reportDate} • TFM IA Generativa 2025`, pageWidth / 2, footerY, { align: 'center' });

      // Download
      const fileName = selectedIsland || selectedYear || selectedMonth
        ? 'canarias_tourism_report_filtered.pdf'
        : 'canarias_tourism_report_complete.pdf';

      pdf.save(fileName);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el informe PDF. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-ocean-500 hover:bg-ocean-600 text-white px-4 py-2 rounded-lg
                   flex items-center gap-2 transition-colors shadow-lg"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        <span>Descargar</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-volcanic-800 border border-volcanic-700
                        rounded-lg shadow-xl z-[100] overflow-hidden">
          <div className="py-1">
            <button
              onClick={handleDownloadJSON}
              className="w-full px-4 py-3 text-left hover:bg-volcanic-700 transition-colors
                         flex items-center gap-3 text-volcanic-100"
            >
              <svg
                className="w-5 h-5 text-ocean-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <div>
                <div className="font-semibold">Datos JSON</div>
                <div className="text-xs text-volcanic-400">Dataset completo</div>
              </div>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="w-full px-4 py-3 text-left hover:bg-volcanic-700 transition-colors
                         flex items-center gap-3 text-volcanic-100 border-t border-volcanic-700"
            >
              <svg
                className="w-5 h-5 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <div>
                <div className="font-semibold">Informe PDF</div>
                <div className="text-xs text-volcanic-400">
                  {selectedIsland || selectedYear || selectedMonth
                    ? 'Datos filtrados'
                    : 'Todos los datos'}
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
