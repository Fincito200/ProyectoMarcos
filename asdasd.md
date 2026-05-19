================================================================
  GUÍA DE REEMPLAZOS PARA VS CODE — CLÍNICA MARCOS
  Usa: Ctrl+H  →  asegúrate que "Expresión regular" esté DESACTIVADA
  Para reemplazar en todos los archivos: Ctrl+Shift+H
================================================================

INSTRUCCIONES:
1. Abre VS Code en la carpeta del proyecto
2. Presiona Ctrl+Shift+H (reemplazar en archivos)
3. En "files to include" escribe: *.html
4. Copia el texto de BUSCAR en el campo "Search"
5. Copia el texto de REEMPLAZAR en el campo "Replace"
6. Haz clic en "Replace All"

NOTA: Las imágenes SVG están embebidas en base64 dentro del atributo src
      del tag <img>. Copia cada bloque completo tal como aparece.

================================================================
  REEMPLAZOS GLOBALES (aplican a TODOS los .html)
  Hazlos primero — así no tienes que repetirlos archivo por archivo
================================================================

──────────────────────────────────────────────────────────────
EMOJI: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'26'%20cy%3D'26'%20r%3D'22'%20fill%3D'%230A3760'%2F%3E%3Cpath%20d%3D'M16%2016%20C18%2020%2022%2024%2026%2026%20C30%2028%2034%2030%2036%2034%20L32%2038%20C28%2036%2020%2028%2014%2020%20Z'%20fill%3D'%2329A8EF'%2F%3E%3Cpath%20d%3D'M34%2034%20L38%2030%20C40%2032%2042%2034%2040%2038%20C38%2042%2032%2044%2026%2040'%20fill%3D'%230E588E'%2F%3E%3Cpath%20d%3D'M16%2016%20L20%2012%20C22%2010%2024%2012%2026%2014%20C22%2018%2018%2020%2016%2016Z'%20fill%3D'%230E588E'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;"> (teléfono)   → aparece en: index, nosotros, mis-citas, mi-perfil, nuestros-doctores, consejos-de-salud
──────────────────────────────────────────────────────────────
BUSCAR:    <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'26'%20cy%3D'26'%20r%3D'22'%20fill%3D'%230A3760'%2F%3E%3Cpath%20d%3D'M16%2016%20C18%2020%2022%2024%2026%2026%20C30%2028%2034%2030%2036%2034%20L32%2038%20C28%2036%2020%2028%2014%2020%20Z'%20fill%3D'%2329A8EF'%2F%3E%3Cpath%20d%3D'M34%2034%20L38%2030%20C40%2032%2042%2034%2040%2038%20C38%2042%2032%2044%2026%2040'%20fill%3D'%230E588E'%2F%3E%3Cpath%20d%3D'M16%2016%20L20%2012%20C22%2010%2024%2012%2026%2014%20C22%2018%2018%2020%2016%2016Z'%20fill%3D'%230E588E'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'26'%20cy%3D'26'%20r%3D'22'%20fill%3D'%230A3760'%2F%3E%3Cpath%20d%3D'M16%2016%20C18%2020%2022%2024%2026%2026%20C30%2028%2034%2030%2036%2034%20L32%2038%20C28%2036%2020%2028%2014%2020%20Z'%20fill%3D'%2329A8EF'%2F%3E%3Cpath%20d%3D'M34%2034%20L38%2030%20C40%2032%2042%2034%2040%2038%20C38%2042%2032%2044%2026%2040'%20fill%3D'%230E588E'%2F%3E%3Cpath%20d%3D'M16%2016%20L20%2012%20C22%2010%2024%2012%2026%2014%20C22%2018%2018%2020%2016%2016Z'%20fill%3D'%230E588E'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 🕐 (reloj)   → aparece en: index, nosotros, mis-citas, mi-perfil, nuestros-doctores, consejos-de-salud
──────────────────────────────────────────────────────────────
BUSCAR:    🕐
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'26'%20cy%3D'26'%20r%3D'22'%20fill%3D'%230A3760'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'26'%20r%3D'18'%20fill%3D'%230E588E'%2F%3E%3Cline%20x1%3D'26'%20y1%3D'26'%20x2%3D'26'%20y2%3D'14'%20stroke%3D'white'%20stroke-width%3D'2.5'%20stroke-linecap%3D'round'%2F%3E%3Cline%20x1%3D'26'%20y1%3D'26'%20x2%3D'34'%20y2%3D'26'%20stroke%3D'%23a8d8f0'%20stroke-width%3D'2'%20stroke-linecap%3D'round'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'26'%20r%3D'2.5'%20fill%3D'%2329A8EF'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 📍 (ubicación)   → aparece en: index, nosotros, mis-citas, mi-perfil, nuestros-doctores, consejos-de-salud
──────────────────────────────────────────────────────────────
BUSCAR:    📍
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Cpath%20d%3D'M26%206%20C18%206%2012%2012%2012%2020%20C12%2032%2026%2046%2026%2046%20C26%2046%2040%2032%2040%2020%20C40%2012%2034%206%2026%206Z'%20fill%3D'%230E588E'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'20'%20r%3D'7'%20fill%3D'%2329A8EF'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'20'%20r%3D'3'%20fill%3D'white'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 📧 (email)   → aparece en: index, nosotros, mis-citas, nuestros-doctores, consejos-de-salud
──────────────────────────────────────────────────────────────
BUSCAR:    📧
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Crect%20x%3D'6'%20y%3D'14'%20width%3D'40'%20height%3D'28'%20rx%3D'5'%20fill%3D'%230E588E'%2F%3E%3Cpath%20d%3D'M6%2016%20L26%2030%20L46%2016'%20stroke%3D'%2329A8EF'%20stroke-width%3D'2.5'%20fill%3D'none'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: ⚡ (inicio)   → aparece en: index, nosotros, nuestros-doctores, consejos-de-salud
──────────────────────────────────────────────────────────────
BUSCAR:    ⚡
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Cpolygon%20points%3D'30%2C4%2012%2C30%2024%2C30%2022%2C48%2040%2C22%2028%2C22'%20fill%3D'%2329A8EF'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 🤖 (redes)   → aparece en: index, nosotros, nuestros-doctores, consejos-de-salud
──────────────────────────────────────────────────────────────
BUSCAR:    🤖
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Crect%20x%3D'10'%20y%3D'18'%20width%3D'32'%20height%3D'26'%20rx%3D'6'%20fill%3D'%230E588E'%2F%3E%3Ccircle%20cx%3D'20'%20cy%3D'28'%20r%3D'4'%20fill%3D'%2329A8EF'%2F%3E%3Ccircle%20cx%3D'32'%20cy%3D'28'%20r%3D'4'%20fill%3D'%2329A8EF'%2F%3E%3Ccircle%20cx%3D'20'%20cy%3D'28'%20r%3D'2'%20fill%3D'white'%2F%3E%3Ccircle%20cx%3D'32'%20cy%3D'28'%20r%3D'2'%20fill%3D'white'%2F%3E%3Crect%20x%3D'18'%20y%3D'36'%20width%3D'16'%20height%3D'3'%20rx%3D'1.5'%20fill%3D'%23a8d8f0'%20opacity%3D'.7'%2F%3E%3Crect%20x%3D'24'%20y%3D'12'%20width%3D'4'%20height%3D'8'%20rx%3D'2'%20fill%3D'%230A3760'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'10'%20r%3D'3'%20fill%3D'%2329A8EF'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: ⌛ (opciones)   → aparece en: index, nosotros, nuestros-doctores, consejos-de-salud
──────────────────────────────────────────────────────────────
BUSCAR:    ⌛
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Cpath%20d%3D'M14%204h24M14%2048h24'%20stroke%3D'%230E588E'%20stroke-width%3D'3'%20stroke-linecap%3D'round'%2F%3E%3Cpath%20d%3D'M16%204%20C16%204%2012%2018%2026%2026%20C40%2034%2036%2048%2036%2048%20L16%2048%20C16%2048%2012%2034%2026%2026%20C40%2018%2036%204%2036%204Z'%20fill%3D'%230A3760'%2F%3E%3Cellipse%20cx%3D'26'%20cy%3D'38'%20rx%3D'7'%20ry%3D'4'%20fill%3D'%2329A8EF'%20opacity%3D'.6'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 👨‍💼 (nosotros)   → aparece en: index, nosotros, nuestros-doctores, consejos-de-salud
──────────────────────────────────────────────────────────────
BUSCAR:    👨‍💼
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'26'%20cy%3D'18'%20r%3D'12'%20fill%3D'%230E588E'%2F%3E%3Cpath%20d%3D'M14%2036%20C14%2030%2038%2030%2038%2036%20L38%2046%20C38%2046%2014%2046%2014%2036Z'%20fill%3D'%230A3760'%2F%3E%3Crect%20x%3D'22'%20y%3D'28'%20width%3D'8'%20height%3D'6'%20rx%3D'2'%20fill%3D'%2329A8EF'%20opacity%3D'.5'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'26'%20cy%3D'16'%20r%3D'11'%20fill%3D'%230E588E'%2F%3E%3Cpath%20d%3D'M13%2035%20C13%2028%2039%2028%2039%2035%20L39%2046%20L13%2046%20Z'%20fill%3D'%230A3760'%2F%3E%3Cpath%20d%3D'M22%2036%20C22%2036%2018%2038%2018%2042%20C18%2046%2022%2046%2022%2046'%20stroke%3D'%2329A8EF'%20stroke-width%3D'2'%20fill%3D'none'%2F%3E%3Cpath%20d%3D'M22%2036%20C22%2036%2026%2038%2026%2042%20C26%2046%2022%2046%2022%2046'%20stroke%3D'%2329A8EF'%20stroke-width%3D'2'%20fill%3D'none'%2F%3E%3Ccircle%20cx%3D'22'%20cy%3D'46'%20r%3D'2'%20fill%3D'%2329A8EF'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;"> (nuestros doctores / médico)   → aparece en: index, nosotros, nuestros-doctores, consejos-de-salud, admin, doctor, login
──────────────────────────────────────────────────────────────
BUSCAR:    <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'26'%20cy%3D'16'%20r%3D'11'%20fill%3D'%230E588E'%2F%3E%3Cpath%20d%3D'M13%2035%20C13%2028%2039%2028%2039%2035%20L39%2046%20L13%2046%20Z'%20fill%3D'%230A3760'%2F%3E%3Cpath%20d%3D'M22%2036%20C22%2036%2018%2038%2018%2042%20C18%2046%2022%2046%2022%2046'%20stroke%3D'%2329A8EF'%20stroke-width%3D'2'%20fill%3D'none'%2F%3E%3Cpath%20d%3D'M22%2036%20C22%2036%2026%2038%2026%2042%20C26%2046%2022%2046%2022%2046'%20stroke%3D'%2329A8EF'%20stroke-width%3D'2'%20fill%3D'none'%2F%3E%3Ccircle%20cx%3D'22'%20cy%3D'46'%20r%3D'2'%20fill%3D'%2329A8EF'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'26'%20cy%3D'16'%20r%3D'11'%20fill%3D'%230E588E'%2F%3E%3Cpath%20d%3D'M13%2035%20C13%2028%2039%2028%2039%2035%20L39%2046%20L13%2046%20Z'%20fill%3D'%230A3760'%2F%3E%3Cpath%20d%3D'M22%2036%20C22%2036%2018%2038%2018%2042%20C18%2046%2022%2046%2022%2046'%20stroke%3D'%2329A8EF'%20stroke-width%3D'2'%20fill%3D'none'%2F%3E%3Cpath%20d%3D'M22%2036%20C22%2036%2026%2038%2026%2042%20C26%2046%2022%2046%2022%2046'%20stroke%3D'%2329A8EF'%20stroke-width%3D'2'%20fill%3D'none'%2F%3E%3Ccircle%20cx%3D'22'%20cy%3D'46'%20r%3D'2'%20fill%3D'%2329A8EF'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 💡 (consejos)   → aparece en: index, nosotros, nuestros-doctores, consejos-de-salud
──────────────────────────────────────────────────────────────
BUSCAR:    💡
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'26'%20cy%3D'22'%20r%3D'14'%20fill%3D'%2329A8EF'%20opacity%3D'.3'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'22'%20r%3D'10'%20fill%3D'%230E588E'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'22'%20r%3D'6'%20fill%3D'%2329A8EF'%20opacity%3D'.6'%2F%3E%3Crect%20x%3D'20'%20y%3D'34'%20width%3D'12'%20height%3D'4'%20rx%3D'2'%20fill%3D'%230E588E'%2F%3E%3Crect%20x%3D'21'%20y%3D'39'%20width%3D'10'%20height%3D'4'%20rx%3D'2'%20fill%3D'%230A3760'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 📅 (generar cita / calendario)   → aparece en: index, nosotros, nuestros-doctores, consejos-de-salud, mis-citas, doctor
──────────────────────────────────────────────────────────────
BUSCAR:    📅
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Crect%20x%3D'4'%20y%3D'10'%20width%3D'44'%20height%3D'38'%20rx%3D'6'%20fill%3D'%230E588E'%2F%3E%3Crect%20x%3D'4'%20y%3D'10'%20width%3D'44'%20height%3D'14'%20rx%3D'6'%20fill%3D'%230A3760'%2F%3E%3Ccircle%20cx%3D'15'%20cy%3D'7'%20r%3D'4'%20fill%3D'%2329A8EF'%2F%3E%3Ccircle%20cx%3D'37'%20cy%3D'7'%20r%3D'4'%20fill%3D'%2329A8EF'%2F%3E%3Crect%20x%3D'13'%20y%3D'30'%20width%3D'8'%20height%3D'8'%20rx%3D'2'%20fill%3D'white'%20opacity%3D'.9'%2F%3E%3Crect%20x%3D'25'%20y%3D'30'%20width%3D'8'%20height%3D'8'%20rx%3D'2'%20fill%3D'%23a8d8f0'%20opacity%3D'.8'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 🔐 (iniciar sesión)   → aparece en: index, nosotros, nuestros-doctores, consejos-de-salud, admin-login
──────────────────────────────────────────────────────────────
BUSCAR:    🔐
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Crect%20x%3D'10'%20y%3D'24'%20width%3D'32'%20height%3D'24'%20rx%3D'5'%20fill%3D'%230E588E'%2F%3E%3Cpath%20d%3D'M18%2024v-8a8%208%200%200%201%2016%200v8'%20stroke%3D'%230A3760'%20stroke-width%3D'4'%20stroke-linecap%3D'round'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'36'%20r%3D'5'%20fill%3D'white'%2F%3E%3Crect%20x%3D'24'%20y%3D'36'%20width%3D'4'%20height%3D'6'%20rx%3D'2'%20fill%3D'%230E588E'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 🗓️ (mis citas)   → aparece en: index, nosotros, nuestros-doctores, consejos-de-salud, mis-citas
──────────────────────────────────────────────────────────────
BUSCAR:    🗓️
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Crect%20x%3D'4'%20y%3D'10'%20width%3D'44'%20height%3D'38'%20rx%3D'6'%20fill%3D'%230E588E'%2F%3E%3Crect%20x%3D'4'%20y%3D'10'%20width%3D'44'%20height%3D'12'%20rx%3D'6'%20fill%3D'%230A3760'%2F%3E%3Ccircle%20cx%3D'15'%20cy%3D'7'%20r%3D'4'%20fill%3D'%2329A8EF'%2F%3E%3Ccircle%20cx%3D'37'%20cy%3D'7'%20r%3D'4'%20fill%3D'%2329A8EF'%2F%3E%3Cline%20x1%3D'14'%20y1%3D'30'%20x2%3D'38'%20y2%3D'30'%20stroke%3D'white'%20stroke-width%3D'2'%20stroke-linecap%3D'round'%20opacity%3D'.5'%2F%3E%3Cline%20x1%3D'14'%20y1%3D'36'%20x2%3D'38'%20y2%3D'36'%20stroke%3D'white'%20stroke-width%3D'2'%20stroke-linecap%3D'round'%20opacity%3D'.5'%2F%3E%3Cline%20x1%3D'14'%20y1%3D'42'%20x2%3D'28'%20y2%3D'42'%20stroke%3D'white'%20stroke-width%3D'2'%20stroke-linecap%3D'round'%20opacity%3D'.5'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 🚪 (cerrar sesión)   → aparece en: index, nosotros, nuestros-doctores, consejos-de-salud, admin, doctor, mi-perfil, mis-citas
──────────────────────────────────────────────────────────────
BUSCAR:    🚪
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Crect%20x%3D'8'%20y%3D'4'%20width%3D'36'%20height%3D'46'%20rx%3D'4'%20fill%3D'%230A3760'%2F%3E%3Crect%20x%3D'11'%20y%3D'7'%20width%3D'30'%20height%3D'40'%20rx%3D'3'%20fill%3D'%230E588E'%2F%3E%3Ccircle%20cx%3D'36'%20cy%3D'27'%20r%3D'3'%20fill%3D'%2329A8EF'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: ⚠️ (advertencia)   → aparece en: index, nosotros, nuestros-doctores, consejos-de-salud, admin
──────────────────────────────────────────────────────────────
BUSCAR:    ⚠️
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Cpath%20d%3D'M26%206%20L48%2044%20L4%2044%20Z'%20fill%3D'%230E588E'%2F%3E%3Cpath%20d%3D'M26%206%20L46%2042%20L6%2042%20Z'%20fill%3D'%2329A8EF'%20opacity%3D'.3'%2F%3E%3Crect%20x%3D'24'%20y%3D'20'%20width%3D'4'%20height%3D'13'%20rx%3D'2'%20fill%3D'white'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'38'%20r%3D'2.5'%20fill%3D'white'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 📝 (registrarse / notas)   → aparece en: index, nosotros, nuestros-doctores, consejos-de-salud, doctor, mis-citas
──────────────────────────────────────────────────────────────
BUSCAR:    📝
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Crect%20x%3D'8'%20y%3D'6'%20width%3D'30'%20height%3D'40'%20rx%3D'4'%20fill%3D'%230A3760'%2F%3E%3Crect%20x%3D'12'%20y%3D'14'%20width%3D'18'%20height%3D'2.5'%20rx%3D'1.2'%20fill%3D'%2329A8EF'%20opacity%3D'.8'%2F%3E%3Crect%20x%3D'12'%20y%3D'20'%20width%3D'22'%20height%3D'2.5'%20rx%3D'1.2'%20fill%3D'%23a8d8f0'%20opacity%3D'.7'%2F%3E%3Crect%20x%3D'12'%20y%3D'26'%20width%3D'16'%20height%3D'2.5'%20rx%3D'1.2'%20fill%3D'%23a8d8f0'%20opacity%3D'.7'%2F%3E%3Cpath%20d%3D'M34%2032%20L44%2022%20L48%2026%20L38%2036%20L34%2037%20Z'%20fill%3D'%2329A8EF'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 👤 (perfil / paciente)   → aparece en: index, nosotros, nuestros-doctores, consejos-de-salud, mi-perfil, mis-citas, login, admin
──────────────────────────────────────────────────────────────
BUSCAR:    👤
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'26'%20cy%3D'18'%20r%3D'10'%20fill%3D'%230E588E'%2F%3E%3Cpath%20d%3D'M8%2048%20C8%2036%2044%2036%2044%2048'%20fill%3D'%230A3760'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'18'%20r%3D'6'%20fill%3D'%2329A8EF'%20opacity%3D'.4'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 🏥 (hospital / clínica)   → aparece en: index, nosotros, nuestros-doctores, consejos-de-salud, login, register
──────────────────────────────────────────────────────────────
BUSCAR:    🏥
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Crect%20x%3D'6'%20y%3D'20'%20width%3D'40'%20height%3D'28'%20rx%3D'4'%20fill%3D'%230E588E'%2F%3E%3Cpath%20d%3D'M18%204%20L18%2016%20L34%2016%20L34%204%20Z'%20fill%3D'%230A3760'%2F%3E%3Crect%20x%3D'23'%20y%3D'26'%20width%3D'6'%20height%3D'10'%20rx%3D'1'%20fill%3D'white'%2F%3E%3Crect%20x%3D'20'%20y%3D'29'%20width%3D'12'%20height%3D'4'%20rx%3D'1'%20fill%3D'white'%2F%3E%3Crect%20x%3D'10'%20y%3D'32'%20width%3D'8'%20height%3D'14'%20rx%3D'2'%20fill%3D'%23a8d8f0'%20opacity%3D'.5'%2F%3E%3Crect%20x%3D'34'%20y%3D'32'%20width%3D'8'%20height%3D'14'%20rx%3D'2'%20fill%3D'%23a8d8f0'%20opacity%3D'.5'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: ✅ (confirmado)   → aparece en: index, nosotros, nuestros-doctores, consejos-de-salud, doctor
──────────────────────────────────────────────────────────────
BUSCAR:    ✅
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'26'%20cy%3D'26'%20r%3D'22'%20fill%3D'%231a7a3c'%2F%3E%3Cpath%20d%3D'M15%2026%20L22%2033%20L37%2018'%20stroke%3D'white'%20stroke-width%3D'4'%20stroke-linecap%3D'round'%20stroke-linejoin%3D'round'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 🎉 (éxito / cita registrada)   → aparece en: index, nosotros, nuestros-doctores, consejos-de-salud
──────────────────────────────────────────────────────────────
BUSCAR:    🎉
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Cpath%20d%3D'M8%2044%20L22%2016%20L38%2032%20Z'%20fill%3D'%230E588E'%2F%3E%3Ccircle%20cx%3D'34'%20cy%3D'12'%20r%3D'5'%20fill%3D'%2329A8EF'%2F%3E%3Ccircle%20cx%3D'14'%20cy%3D'20'%20r%3D'3'%20fill%3D'%230A3760'%2F%3E%3Ccircle%20cx%3D'40'%20cy%3D'30'%20r%3D'4'%20fill%3D'%230A3760'%2F%3E%3Cline%20x1%3D'26'%20y1%3D'6'%20x2%3D'30'%20y2%3D'14'%20stroke%3D'%2329A8EF'%20stroke-width%3D'2'%2F%3E%3Cline%20x1%3D'42'%20y1%3D'8'%20x2%3D'38'%20y2%3D'16'%20stroke%3D'%23a8d8f0'%20stroke-width%3D'2'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 🩺 (médico / estetoscopio)   → aparece en: index, nuestros-doctores, consejos-de-salud, doctor, login
──────────────────────────────────────────────────────────────
BUSCAR:    🩺
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'36'%20cy%3D'36'%20r%3D'10'%20fill%3D'%230A3760'%2F%3E%3Ccircle%20cx%3D'36'%20cy%3D'36'%20r%3D'6'%20fill%3D'%230E588E'%2F%3E%3Ccircle%20cx%3D'36'%20cy%3D'36'%20r%3D'3'%20fill%3D'%2329A8EF'%2F%3E%3Cpath%20d%3D'M16%208%20C10%208%208%2014%208%2018%20C8%2026%2016%2030%2024%2036'%20stroke%3D'%230E588E'%20stroke-width%3D'4'%20stroke-linecap%3D'round'%2F%3E%3Cpath%20d%3D'M20%208%20C26%208%2028%2014%2028%2018%20C28%2026%2020%2030%2024%2036'%20stroke%3D'%230E588E'%20stroke-width%3D'4'%20stroke-linecap%3D'round'%2F%3E%3Ccircle%20cx%3D'16'%20cy%3D'8'%20r%3D'4'%20fill%3D'%2329A8EF'%2F%3E%3Ccircle%20cx%3D'20'%20cy%3D'8'%20r%3D'4'%20fill%3D'%2329A8EF'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 🫀 (cardiología)   → aparece en: index, nuestros-doctores, consejos-de-salud
──────────────────────────────────────────────────────────────
BUSCAR:    🫀
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Cpath%20d%3D'M26%2042%20C26%2042%206%2030%206%2018%20C6%2011%2011%206%2018%208%20C21%209%2024%2011%2026%2014%20C28%2011%2031%209%2034%208%20C41%206%2046%2011%2046%2018%20C46%2030%2026%2042%2026%2042Z'%20fill%3D'%230E588E'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 🧠 (neurología)   → aparece en: index, nuestros-doctores, consejos-de-salud
──────────────────────────────────────────────────────────────
BUSCAR:    🧠
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Cpath%20d%3D'M26%2010%20C18%2010%2010%2016%2010%2024%20C10%2028%2012%2032%2014%2034%20C12%2036%2012%2040%2016%2042%20C18%2044%2022%2044%2024%2042%20C24%2044%2028%2046%2030%2044%20C34%2044%2036%2040%2036%2038%20C40%2036%2042%2032%2042%2026%20C42%2018%2036%2010%2026%2010Z'%20fill%3D'%230E588E'%2F%3E%3Cpath%20d%3D'M26%2010%20C32%2014%2036%2020%2034%2028'%20stroke%3D'%2329A8EF'%20stroke-width%3D'2'%20fill%3D'none'%20opacity%3D'.7'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 👶 (pediatría)   → aparece en: index, nuestros-doctores, consejos-de-salud
──────────────────────────────────────────────────────────────
BUSCAR:    👶
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'26'%20cy%3D'20'%20r%3D'14'%20fill%3D'%230E588E'%2F%3E%3Ccircle%20cx%3D'21'%20cy%3D'18'%20r%3D'2'%20fill%3D'white'%2F%3E%3Ccircle%20cx%3D'31'%20cy%3D'18'%20r%3D'2'%20fill%3D'white'%2F%3E%3Cpath%20d%3D'M21%2025%20Q26%2029%2031%2025'%20stroke%3D'white'%20stroke-width%3D'1.5'%20fill%3D'none'%20stroke-linecap%3D'round'%2F%3E%3Cpath%20d%3D'M14%2038%20C14%2032%2038%2032%2038%2038%20L38%2046%20C38%2046%2014%2046%2014%2038Z'%20fill%3D'%230A3760'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 🌸 (ginecología)   → aparece en: index, nuestros-doctores, consejos-de-salud
──────────────────────────────────────────────────────────────
BUSCAR:    🌸
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'26'%20cy%3D'26'%20r%3D'6'%20fill%3D'%2329A8EF'%2F%3E%3Cellipse%20cx%3D'26'%20cy%3D'14'%20rx%3D'5'%20ry%3D'8'%20fill%3D'%230E588E'%20opacity%3D'.8'%2F%3E%3Cellipse%20cx%3D'26'%20cy%3D'38'%20rx%3D'5'%20ry%3D'8'%20fill%3D'%230E588E'%20opacity%3D'.8'%2F%3E%3Cellipse%20cx%3D'14'%20cy%3D'26'%20rx%3D'8'%20ry%3D'5'%20fill%3D'%230E588E'%20opacity%3D'.7'%2F%3E%3Cellipse%20cx%3D'38'%20cy%3D'26'%20rx%3D'8'%20ry%3D'5'%20fill%3D'%230E588E'%20opacity%3D'.7'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'26'%20r%3D'4'%20fill%3D'white'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 🦴 (traumatología)   → aparece en: index, nuestros-doctores, consejos-de-salud
──────────────────────────────────────────────────────────────
BUSCAR:    🦴
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Crect%20x%3D'18'%20y%3D'18'%20width%3D'16'%20height%3D'16'%20rx%3D'3'%20fill%3D'%230E588E'%20transform%3D'rotate(45%2026%2026)'%2F%3E%3Ccircle%20cx%3D'12'%20cy%3D'12'%20r%3D'6'%20fill%3D'%230A3760'%2F%3E%3Ccircle%20cx%3D'40'%20cy%3D'12'%20r%3D'6'%20fill%3D'%230A3760'%2F%3E%3Ccircle%20cx%3D'12'%20cy%3D'40'%20r%3D'6'%20fill%3D'%230A3760'%2F%3E%3Ccircle%20cx%3D'40'%20cy%3D'40'%20r%3D'6'%20fill%3D'%230A3760'%2F%3E%3Ccircle%20cx%3D'12'%20cy%3D'12'%20r%3D'3'%20fill%3D'%2329A8EF'%20opacity%3D'.5'%2F%3E%3Ccircle%20cx%3D'40'%20cy%3D'12'%20r%3D'3'%20fill%3D'%2329A8EF'%20opacity%3D'.5'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 🧬 (dermatología)   → aparece en: index, nuestros-doctores, consejos-de-salud
──────────────────────────────────────────────────────────────
BUSCAR:    🧬
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Cpath%20d%3D'M18%204%20C22%2012%2030%2016%2034%2024%20C38%2032%2030%2036%2026%2044%20C22%2052%2018%2048%2018%2048'%20stroke%3D'%230E588E'%20stroke-width%3D'3'%20fill%3D'none'%20stroke-linecap%3D'round'%2F%3E%3Cpath%20d%3D'M34%204%20C30%2012%2022%2016%2018%2024%20C14%2032%2022%2036%2026%2044%20C30%2052%2034%2048%2034%2048'%20stroke%3D'%230A3760'%20stroke-width%3D'3'%20fill%3D'none'%20stroke-linecap%3D'round'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'16'%20r%3D'3'%20fill%3D'%2329A8EF'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'26'%20r%3D'3'%20fill%3D'%2329A8EF'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'36'%20r%3D'3'%20fill%3D'%2329A8EF'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 📘 (Facebook)   → aparece en: index, nosotros, nuestros-doctores, consejos-de-salud
──────────────────────────────────────────────────────────────
BUSCAR:    📘
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Crect%20x%3D'10'%20y%3D'6'%20width%3D'32'%20height%3D'40'%20rx%3D'3'%20fill%3D'%230A3760'%2F%3E%3Crect%20x%3D'14'%20y%3D'6'%20width%3D'28'%20height%3D'40'%20rx%3D'3'%20fill%3D'%230E588E'%2F%3E%3Crect%20x%3D'14'%20y%3D'6'%20width%3D'4'%20height%3D'40'%20fill%3D'%230A3760'%20opacity%3D'.4'%2F%3E%3Crect%20x%3D'20'%20y%3D'14'%20width%3D'16'%20height%3D'2'%20rx%3D'1'%20fill%3D'white'%20opacity%3D'.6'%2F%3E%3Crect%20x%3D'20'%20y%3D'20'%20width%3D'14'%20height%3D'2'%20rx%3D'1'%20fill%3D'%23a8d8f0'%20opacity%3D'.5'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 📸 (Instagram)   → aparece en: index, nosotros, nuestros-doctores, consejos-de-salud
──────────────────────────────────────────────────────────────
BUSCAR:    📸
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Crect%20x%3D'4'%20y%3D'14'%20width%3D'44'%20height%3D'32'%20rx%3D'5'%20fill%3D'%230A3760'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'30'%20r%3D'10'%20fill%3D'%230E588E'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'30'%20r%3D'6'%20fill%3D'%2329A8EF'%20opacity%3D'.4'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'30'%20r%3D'3'%20fill%3D'white'%20opacity%3D'.7'%2F%3E%3Crect%20x%3D'18'%20y%3D'8'%20width%3D'16'%20height%3D'8'%20rx%3D'3'%20fill%3D'%230A3760'%2F%3E%3Ccircle%20cx%3D'40'%20cy%3D'20'%20r%3D'3'%20fill%3D'%2329A8EF'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 🐦 (Twitter/X)   → aparece en: index, nosotros, nuestros-doctores, consejos-de-salud
──────────────────────────────────────────────────────────────
BUSCAR:    🐦
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Cpath%20d%3D'M44%2010%20C38%208%2032%2010%2028%2014%20C24%2018%2024%2024%2026%2028%20C20%2028%2014%2024%2010%2018%20C8%2024%2010%2032%2018%2036%20C14%2036%2010%2034%208%2032%20C8%2038%2012%2044%2020%2046%20C28%2048%2038%2046%2044%2038%20C50%2030%2050%2018%2044%2010Z'%20fill%3D'%230E588E'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 📱 (WhatsApp)   → aparece en: index, nosotros, nuestros-doctores, consejos-de-salud
──────────────────────────────────────────────────────────────
BUSCAR:    📱
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Crect%20x%3D'14'%20y%3D'4'%20width%3D'24'%20height%3D'44'%20rx%3D'6'%20fill%3D'%230A3760'%2F%3E%3Crect%20x%3D'16'%20y%3D'8'%20width%3D'20'%20height%3D'34'%20rx%3D'4'%20fill%3D'%230E588E'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'44'%20r%3D'2'%20fill%3D'%2329A8EF'%20opacity%3D'.6'%2F%3E%3Crect%20x%3D'22'%20y%3D'6'%20width%3D'8'%20height%3D'2'%20rx%3D'1'%20fill%3D'%2329A8EF'%20opacity%3D'.4'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 🚨 (emergencias)   → aparece en: index, nosotros, nuestros-doctores, consejos-de-salud
──────────────────────────────────────────────────────────────
BUSCAR:    🚨
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Crect%20x%3D'10'%20y%3D'22'%20width%3D'32'%20height%3D'22'%20rx%3D'4'%20fill%3D'%230E588E'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'16'%20r%3D'10'%20fill%3D'%230A3760'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'16'%20r%3D'7'%20fill%3D'%23c0392b'%2F%3E%3Crect%20x%3D'12'%20y%3D'40'%20width%3D'28'%20height%3D'4'%20rx%3D'2'%20fill%3D'%230A3760'%2F%3E%3Cline%20x1%3D'26'%20y1%3D'6'%20x2%3D'26'%20y2%3D'10'%20stroke%3D'%2329A8EF'%20stroke-width%3D'3'%20stroke-linecap%3D'round'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 📋 (historial / todas las citas)   → aparece en: admin, doctor
──────────────────────────────────────────────────────────────
BUSCAR:    📋
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Crect%20x%3D'8'%20y%3D'10'%20width%3D'36'%20height%3D'38'%20rx%3D'4'%20fill%3D'%230E588E'%2F%3E%3Crect%20x%3D'18'%20y%3D'6'%20width%3D'16'%20height%3D'10'%20rx%3D'3'%20fill%3D'%230A3760'%2F%3E%3Crect%20x%3D'14'%20y%3D'22'%20width%3D'24'%20height%3D'2.5'%20rx%3D'1.2'%20fill%3D'white'%20opacity%3D'.7'%2F%3E%3Crect%20x%3D'14'%20y%3D'28'%20width%3D'20'%20height%3D'2.5'%20rx%3D'1.2'%20fill%3D'%23a8d8f0'%20opacity%3D'.6'%2F%3E%3Crect%20x%3D'14'%20y%3D'34'%20width%3D'16'%20height%3D'2.5'%20rx%3D'1.2'%20fill%3D'%23a8d8f0'%20opacity%3D'.6'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

──────────────────────────────────────────────────────────────
EMOJI: 💾 (guardar)   → aparece en: admin, doctor, mi-perfil, mis-citas
──────────────────────────────────────────────────────────────
BUSCAR:    💾
REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Crect%20x%3D'6'%20y%3D'6'%20width%3D'40'%20height%3D'40'%20rx%3D'5'%20fill%3D'%230E588E'%2F%3E%3Crect%20x%3D'14'%20y%3D'6'%20width%3D'20'%20height%3D'14'%20rx%3D'2'%20fill%3D'%230A3760'%2F%3E%3Crect%20x%3D'20'%20y%3D'8'%20width%3D'4'%20height%3D'10'%20rx%3D'1'%20fill%3D'%2329A8EF'%2F%3E%3Crect%20x%3D'10'%20y%3D'28'%20width%3D'32'%20height%3D'16'%20rx%3D'3'%20fill%3D'%230A3760'%2F%3E%3Crect%20x%3D'16'%20y%3D'32'%20width%3D'20'%20height%3D'8'%20rx%3D'2'%20fill%3D'%2329A8EF'%20opacity%3D'.4'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

================================================================
  REEMPLAZOS POR ARCHIVO ESPECÍFICO
================================================================

══════════════════════════════════════════════════════════════
  ARCHIVO: admin-login.html
══════════════════════════════════════════════════════════════

L33 — BUSCAR:    👁️
L33 — REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Cpath%20d%3D'M4%2026%20C4%2026%2014%2010%2026%2010%20C38%2010%2048%2026%2048%2026%20C48%2026%2038%2042%2026%2042%20C14%2042%204%2026%204%2026Z'%20fill%3D'%230E588E'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'26'%20r%3D'8'%20fill%3D'%230A3760'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'26'%20r%3D'5'%20fill%3D'%2329A8EF'%2F%3E%3Ccircle%20cx%3D'28'%20cy%3D'24'%20r%3D'2'%20fill%3D'white'%20opacity%3D'.7'%2F%3E%3C%2Fsvg%3E" width="18" height="18" style="vertical-align:middle;">

══════════════════════════════════════════════════════════════
  ARCHIVO: admin.html
══════════════════════════════════════════════════════════════

L26 — BUSCAR:    🏷️
L26 — REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Cpath%20d%3D'M6%206%20L26%206%20L46%2026%20L30%2042%20L10%2022%20Z'%20fill%3D'%230E588E'%2F%3E%3Ccircle%20cx%3D'16'%20cy%3D'16'%20r%3D'4'%20fill%3D'white'%2F%3E%3Cline%20x1%3D'22'%20y1%3D'20'%20x2%3D'36'%20y2%3D'34'%20stroke%3D'%2329A8EF'%20stroke-width%3D'2'%20opacity%3D'.5'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

L32 y L121 — BUSCAR:    🔒
L32 y L121 — REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Crect%20x%3D'10'%20y%3D'24'%20width%3D'32'%20height%3D'22'%20rx%3D'5'%20fill%3D'%230A3760'%2F%3E%3Cpath%20d%3D'M18%2024v-8a8%208%200%200%201%2016%200v8'%20stroke%3D'%230E588E'%20stroke-width%3D'4'%20stroke-linecap%3D'round'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'35'%20r%3D'4'%20fill%3D'%2329A8EF'%2F%3E%3Crect%20x%3D'24'%20y%3D'35'%20width%3D'4'%20height%3D'6'%20rx%3D'2'%20fill%3D'%230A3760'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

L99 — BUSCAR:    ✖
L99 — REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'26'%20cy%3D'26'%20r%3D'22'%20fill%3D'%230A3760'%20opacity%3D'.5'%2F%3E%3Cline%20x1%3D'16'%20y1%3D'16'%20x2%3D'36'%20y2%3D'36'%20stroke%3D'%2329A8EF'%20stroke-width%3D'4'%20stroke-linecap%3D'round'%2F%3E%3Cline%20x1%3D'36'%20y1%3D'16'%20x2%3D'16'%20y2%3D'36'%20stroke%3D'%2329A8EF'%20stroke-width%3D'4'%20stroke-linecap%3D'round'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

══════════════════════════════════════════════════════════════
  ARCHIVO: doctor.html
══════════════════════════════════════════════════════════════

L50 — BUSCAR:    ⏳
L50 — REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Cpath%20d%3D'M14%204h24M14%2048h24'%20stroke%3D'%230A3760'%20stroke-width%3D'3'%20stroke-linecap%3D'round'%2F%3E%3Cpath%20d%3D'M16%204%20L36%204%20L36%2020%20L26%2028%20L16%2020%20Z'%20fill%3D'%230E588E'%2F%3E%3Cpath%20d%3D'M16%2048%20L36%2048%20L36%2032%20L26%2028%20L16%2032%20Z'%20fill%3D'%230A3760'%2F%3E%3Cellipse%20cx%3D'26'%20cy%3D'38'%20rx%3D'6'%20ry%3D'3.5'%20fill%3D'%2329A8EF'%20opacity%3D'.7'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

L52 — BUSCAR:    🏁
L52 — REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Crect%20x%3D'8'%20y%3D'6'%20width%3D'4'%20height%3D'42'%20rx%3D'2'%20fill%3D'%230A3760'%2F%3E%3Crect%20x%3D'12'%20y%3D'6'%20width%3D'30'%20height%3D'20'%20fill%3D'%230E588E'%2F%3E%3Crect%20x%3D'12'%20y%3D'6'%20width%3D'10'%20height%3D'10'%20fill%3D'%2329A8EF'%20opacity%3D'.7'%2F%3E%3Crect%20x%3D'22'%20y%3D'6'%20width%3D'10'%20height%3D'10'%20fill%3D'%230A3760'%20opacity%3D'.7'%2F%3E%3Crect%20x%3D'32'%20y%3D'6'%20width%3D'10'%20height%3D'10'%20fill%3D'%2329A8EF'%20opacity%3D'.7'%2F%3E%3Crect%20x%3D'12'%20y%3D'16'%20width%3D'10'%20height%3D'10'%20fill%3D'%230A3760'%20opacity%3D'.7'%2F%3E%3Crect%20x%3D'22'%20y%3D'16'%20width%3D'10'%20height%3D'10'%20fill%3D'%2329A8EF'%20opacity%3D'.7'%2F%3E%3Crect%20x%3D'32'%20y%3D'16'%20width%3D'10'%20height%3D'10'%20fill%3D'%230A3760'%20opacity%3D'.7'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

L104 — BUSCAR:    ❌
L104 — REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'26'%20cy%3D'26'%20r%3D'22'%20fill%3D'%23c0392b'%2F%3E%3Cline%20x1%3D'16'%20y1%3D'16'%20x2%3D'36'%20y2%3D'36'%20stroke%3D'white'%20stroke-width%3D'4'%20stroke-linecap%3D'round'%2F%3E%3Cline%20x1%3D'36'%20y1%3D'16'%20x2%3D'16'%20y2%3D'36'%20stroke%3D'white'%20stroke-width%3D'4'%20stroke-linecap%3D'round'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

══════════════════════════════════════════════════════════════
  ARCHIVO: index.html
══════════════════════════════════════════════════════════════

L383 — BUSCAR:    👁️
L383 — REEMPLAZAR: (mismo SVG que 👁️ de admin-login.html, ver arriba)

L511,L524,L537 — BUSCAR:    ★★★★★
L511 — REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20130%2024'%20fill%3D'none'%3E%3Cpolygon%20points%3D'12%2C2%2015%2C9%2022%2C9%2017%2C14%2019%2C22%2012%2C17%205%2C22%207%2C14%202%2C9%209%2C9'%20fill%3D'%2329A8EF'%2F%3E%3Cpolygon%20points%3D'38%2C2%2041%2C9%2048%2C9%2043%2C14%2045%2C22%2038%2C17%2031%2C22%2033%2C14%2028%2C9%2035%2C9'%20fill%3D'%2329A8EF'%2F%3E%3Cpolygon%20points%3D'64%2C2%2067%2C9%2074%2C9%2069%2C14%2071%2C22%2064%2C17%2057%2C22%2059%2C14%2054%2C9%2061%2C9'%20fill%3D'%2329A8EF'%2F%3E%3Cpolygon%20points%3D'90%2C2%2093%2C9%20100%2C9%2095%2C14%2097%2C22%2090%2C17%2083%2C22%2085%2C14%2080%2C9%2087%2C9'%20fill%3D'%2329A8EF'%2F%3E%3Cpolygon%20points%3D'116%2C2%20119%2C9%20126%2C9%20121%2C14%20123%2C22%20116%2C17%20109%2C22%20111%2C14%20106%2C9%20113%2C9'%20fill%3D'%2329A8EF'%2F%3E%3C%2Fsvg%3E" width="80" height="16" style="vertical-align:middle;">

L300,L312,L324 — BUSCAR (avatar de cards):    🫶
L300 — REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Cpath%20d%3D'M10%2022%20C10%2014%2016%2010%2022%2012%20L26%2016%20L30%2012%20C36%2010%2042%2014%2042%2022%20C42%2034%2026%2046%2026%2046%20C26%2046%2010%2034%2010%2022Z'%20fill%3D'%230E588E'%2F%3E%3C%2Fsvg%3E" width="28" height="28" style="vertical-align:middle;">

L267 — BUSCAR:    🔬
L267 — REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Crect%20x%3D'24'%20y%3D'8'%20width%3D'4'%20height%3D'20'%20rx%3D'2'%20fill%3D'%230A3760'%20transform%3D'rotate(-20%2026%2018)'%2F%3E%3Crect%20x%3D'20'%20y%3D'6'%20width%3D'12'%20height%3D'4'%20rx%3D'2'%20fill%3D'%230E588E'%2F%3E%3Cellipse%20cx%3D'20'%20cy%3D'26'%20rx%3D'8'%20ry%3D'4'%20fill%3D'%2329A8EF'%20opacity%3D'.5'%2F%3E%3Crect%20x%3D'12'%20y%3D'42'%20width%3D'28'%20height%3D'4'%20rx%3D'2'%20fill%3D'%230A3760'%2F%3E%3Crect%20x%3D'22'%20y%3D'30'%20width%3D'4'%20height%3D'12'%20rx%3D'2'%20fill%3D'%230E588E'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

══════════════════════════════════════════════════════════════
  ARCHIVO: login.html
══════════════════════════════════════════════════════════════

L45,L66,L75 — BUSCAR:    🔑
L45 — REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'18'%20cy%3D'20'%20r%3D'12'%20fill%3D'%230E588E'%2F%3E%3Ccircle%20cx%3D'18'%20cy%3D'20'%20r%3D'7'%20fill%3D'%230A3760'%2F%3E%3Ccircle%20cx%3D'18'%20cy%3D'20'%20r%3D'3'%20fill%3D'%2329A8EF'%20opacity%3D'.6'%2F%3E%3Crect%20x%3D'28'%20y%3D'18'%20width%3D'20'%20height%3D'4'%20rx%3D'2'%20fill%3D'%230E588E'%2F%3E%3Crect%20x%3D'40'%20y%3D'22'%20width%3D'4'%20height%3D'6'%20rx%3D'2'%20fill%3D'%230E588E'%2F%3E%3Crect%20x%3D'34'%20y%3D'22'%20width%3D'4'%20height%3D'4'%20rx%3D'2'%20fill%3D'%230A3760'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

══════════════════════════════════════════════════════════════
  ARCHIVO: mi-perfil.html
══════════════════════════════════════════════════════════════

L88,L95 — BUSCAR:    👁️
L88 — REEMPLAZAR: (mismo SVG que 👁️ de admin-login.html, ver arriba)

══════════════════════════════════════════════════════════════
  ARCHIVO: mis-citas.html
══════════════════════════════════════════════════════════════

L63 — BUSCAR:    ✏️
L63 — REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Cpath%20d%3D'M8%2044%20L14%2030%20L36%208%20L44%2016%20L22%2038%20Z'%20fill%3D'%230E588E'%2F%3E%3Cpath%20d%3D'M36%208%20L40%204%20L48%2012%20L44%2016%20Z'%20fill%3D'%230A3760'%2F%3E%3Cpath%20d%3D'M8%2044%20L14%2030%20L20%2036%20Z'%20fill%3D'%2329A8EF'%20opacity%3D'.7'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

L80 — BUSCAR:    ⏰
L80 — REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'26'%20cy%3D'28'%20r%3D'18'%20fill%3D'%230A3760'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'28'%20r%3D'14'%20fill%3D'%230E588E'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'28'%20r%3D'10'%20fill%3D'%230A3760'%2F%3E%3Cline%20x1%3D'26'%20y1%3D'28'%20x2%3D'26'%20y2%3D'20'%20stroke%3D'%2329A8EF'%20stroke-width%3D'2.5'%20stroke-linecap%3D'round'%2F%3E%3Cline%20x1%3D'26'%20y1%3D'28'%20x2%3D'32'%20y2%3D'32'%20stroke%3D'white'%20stroke-width%3D'2'%20stroke-linecap%3D'round'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'28'%20r%3D'2'%20fill%3D'%2329A8EF'%2F%3E%3Cline%20x1%3D'14'%20y1%3D'10'%20x2%3D'18'%20y2%3D'14'%20stroke%3D'%230E588E'%20stroke-width%3D'3'%20stroke-linecap%3D'round'%2F%3E%3Cline%20x1%3D'38'%20y1%3D'10'%20x2%3D'34'%20y2%3D'14'%20stroke%3D'%230E588E'%20stroke-width%3D'3'%20stroke-linecap%3D'round'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

══════════════════════════════════════════════════════════════
  ARCHIVO: nosotros.html
══════════════════════════════════════════════════════════════

L253 — BUSCAR:    🎯
L253 — REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'26'%20cy%3D'26'%20r%3D'22'%20fill%3D'%230A3760'%20opacity%3D'.3'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'26'%20r%3D'16'%20fill%3D'%230E588E'%20opacity%3D'.5'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'26'%20r%3D'10'%20fill%3D'%230E588E'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'26'%20r%3D'5'%20fill%3D'%2329A8EF'%2F%3E%3C%2Fsvg%3E" width="30" height="30" style="vertical-align:middle;">

L258 — BUSCAR:    🔭
L258 — REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Crect%20x%3D'26'%20y%3D'10'%20width%3D'20'%20height%3D'8'%20rx%3D'3'%20fill%3D'%230E588E'%20transform%3D'rotate(30%2026%2010)'%2F%3E%3Crect%20x%3D'16'%20y%3D'24'%20width%3D'14'%20height%3D'6'%20rx%3D'2'%20fill%3D'%230A3760'%20transform%3D'rotate(30%2016%2024)'%2F%3E%3Ccircle%20cx%3D'14'%20cy%3D'36'%20r%3D'6'%20fill%3D'%2329A8EF'%20opacity%3D'.4'%2F%3E%3Crect%20x%3D'22'%20y%3D'34'%20width%3D'4'%20height%3D'14'%20rx%3D'2'%20fill%3D'%230A3760'%2F%3E%3C%2Fsvg%3E" width="30" height="30" style="vertical-align:middle;">

L263 — BUSCAR:    💎
L263 — REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Cpolygon%20points%3D'26%2C6%2044%2C20%2038%2C46%2014%2C46%208%2C20'%20fill%3D'%230E588E'%2F%3E%3Cpolygon%20points%3D'26%2C6%2044%2C20%2026%2C14'%20fill%3D'%230A3760'%2F%3E%3Cpolygon%20points%3D'8%2C20%2026%2C14%2026%2C6'%20fill%3D'%2329A8EF'%20opacity%3D'.5'%2F%3E%3Cline%20x1%3D'8'%20y1%3D'20'%20x2%3D'44'%20y2%3D'20'%20stroke%3D'%2329A8EF'%20stroke-width%3D'1.5'%20opacity%3D'.5'%2F%3E%3C%2Fsvg%3E" width="30" height="30" style="vertical-align:middle;">

L317 — BUSCAR:    🤝
L317 — REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Cpath%20d%3D'M4%2028%20L16%2020%20L24%2024%20L28%2020%20L36%2024%20L48%2016'%20fill%3D'none'%20stroke%3D'%230E588E'%20stroke-width%3D'3'%20stroke-linecap%3D'round'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'24'%20r%3D'4'%20fill%3D'%2329A8EF'%2F%3E%3C%2Fsvg%3E" width="25" height="25" style="vertical-align:middle;">

L335 — BUSCAR:    📌
L335 — REEMPLAZAR: <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2052%2052'%20fill%3D'none'%3E%3Ccircle%20cx%3D'26'%20cy%3D'18'%20r%3D'12'%20fill%3D'%230E588E'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'18'%20r%3D'7'%20fill%3D'%230A3760'%2F%3E%3Ccircle%20cx%3D'26'%20cy%3D'18'%20r%3D'3'%20fill%3D'%2329A8EF'%2F%3E%3Crect%20x%3D'24'%20y%3D'28'%20width%3D'4'%20height%3D'18'%20rx%3D'2'%20fill%3D'%230A3760'%2F%3E%3C%2Fsvg%3E" width="20" height="20" style="vertical-align:middle;">

══════════════════════════════════════════════════════════════
  ARCHIVO: register.html
══════════════════════════════════════════════════════════════

L66,L73 — BUSCAR:    👁️
L66 — REEMPLAZAR: (mismo SVG que 👁️ de admin-login.html, ver arriba)

================================================================
  RESUMEN DE ORDEN RECOMENDADO
================================================================

1. Ctrl+Shift+H → En "files to include": **/*.html
2. Haz primero los GLOBALES (de arriba hacia abajo)
   - Cada uno afecta entre 4 y 8 archivos de una sola vez
3. Luego haz los ESPECÍFICOS por archivo
   - Abre cada archivo y usa Ctrl+H

TOTAL DE EMOJIS A REEMPLAZAR:
  - Globales (Ctrl+Shift+H): 26 reemplazos → afectan ~200 líneas
  - Específicos por archivo:  12 reemplazos adicionales

================================================================