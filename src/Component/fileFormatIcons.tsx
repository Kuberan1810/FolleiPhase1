import React from 'react';
import csvLogo from '../assets/format logos/csv.png';
import fileLogo from '../assets/format logos/file.png';
import imgLogo from '../assets/format logos/imgIcon.png';
import pdfLogo from '../assets/format logos/pdfIcon.svg';
import wordLogo from '../assets/format logos/word.png';
import xlLogo from '../assets/format logos/xl.png';

export { csvLogo, fileLogo, imgLogo, pdfLogo, wordLogo, xlLogo };

export const getFileFormatIcon = (filename: string, className = 'size-6 object-contain') => {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf':
      return <img src={pdfLogo} alt="PDF" className={className} />;
    case 'doc':
    case 'docx':
      return <img src={wordLogo} alt="Word" className={className} />;
    case 'xls':
    case 'xlsx':
      return <img src={xlLogo} alt="Excel" className={className} />;
    case 'csv':
      return <img src={csvLogo} alt="CSV" className={className} />;
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'webp':
    case 'svg':
    case 'gif':
    case 'bmp':
      return <img src={imgLogo} alt="Image" className={className} />;
    default:
      return <img src={fileLogo} alt="File" className={className} />;
  }
};

export const FileFormatIcon: React.FC<{ filename: string; className?: string }> = ({
  filename,
  className = 'size-6 object-contain',
}) => {
  return getFileFormatIcon(filename, className);
};

export default FileFormatIcon;
