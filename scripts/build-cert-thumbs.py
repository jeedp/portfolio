"""Renders the first page of every PDF in public/certificates/ to a JPEG thumbnail beside it.
Usage: npm run thumbs   (needs Python with PyMuPDF: pip install pymupdf)"""
import glob, os
import pymupdf

for pdf in sorted(glob.glob(os.path.join('public', 'certificates', '*.pdf'))):
    page = pymupdf.open(pdf)[0]
    scale = 800 / page.rect.width
    pix = page.get_pixmap(matrix=pymupdf.Matrix(scale, scale))
    out = pdf[:-4] + '.jpg'
    pix.save(out, jpg_quality=82)
    print('wrote', out)
