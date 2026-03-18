# 📁 Utils - Gestión de Assets

## 📋 Guía Rápida

Este directorio contiene todos los assets visuales del proyecto ARGO'S PACK organizados por **funcionalidad** (Feature-Based Organization).

---

## 🎯 Estructura Actual

```
Utils/
├── branding/              # Logos y marca
│   ├── logo-header.png    # Logo para el header
│   └── logo-footer.png    # Logo para el footer
│
├── hero/                  # Sección principal
│   └── hero-main.jpg      # Imagen del hero
│
├── products/              # Productos principales
│   ├── leash-black.jpg           # Correa negra
│   ├── leash-white.jpg           # Correa blanca
│   ├── feeders.jpg               # Comedores
│   ├── hygiene.jpg               # Higiene
│   ├── clothing.jpg              # Ropa
│   └── carrier-gallery/          # Galería transportador
│       ├── carrier-view-1.jpg    # Vista 1
│       ├── carrier-view-2.jpg    # Vista 2
│       ├── carrier-view-3.jpg    # Vista 3
│       ├── carrier-view-4.jpg    # Vista 4
│       ├── carrier-view-5.jpg    # Vista 5
│       └── carrier-view-6.jpg    # Vista 6
│
├── more-products/         # Productos adicionales
│   ├── toys.jpg                  # Juguetes
│   ├── beds.jpg                  # Camas
│   └── training.jpg              # Entrenamiento
│
├── JPG/                   # [LEGACY] Imágenes antiguas
├── PNG/                   # [LEGACY] Logos antiguos
├── SVG/                   # [LEGACY] Vectores
├── PDF/                   # [LEGACY] PDFs
│
├── IMAGE_STRUCTURE.md     # Documentación detallada
└── README.md              # Esta guía
```

---

## 🔄 Cómo Actualizar Imágenes

### 1. Identificar la Sección
```
Header/Footer → branding/
Hero Banner → hero/
Productos → products/
Más Productos → more-products/
```

### 2. Nombrar el Archivo
Usa `kebab-case` descriptivo:
```
✅ leash-black.jpg
✅ carrier-view-1.jpg
✅ hero-main.jpg

❌ IMG_001.jpg
❌ fondo-verde-oscuro_1.jpg
❌ Correa Negra.jpg
```

### 3. Actualizar en HTML
Busca y reemplaza la ruta en `index.html`:
```html
<!-- Antes -->
<img src="Utils/JPG/fondo-blanco_1.jpg">

<!-- Después -->
<img src="Utils/products/leash-black.jpg">
```

---

## 🛠️ Comandos Útiles

### Verificar imágenes usadas en HTML:
```bash
grep -r "src=\"Utils/" index.html
```

### Listar estructura:
```bash
tree Utils/ -L 2
```

---

## 📝 Convenciones

1. **Formato de nombres**: `[section]-[item]-[variant].[ext]`
2. **Idioma**: Inglés para nombres técnicos
3. **Sin espacios**: Usar guiones (-)
4. **Minúsculas**: Todo en lowercase
5. **Descriptivo**: El nombre debe indicar su uso

---

## 🗂️ Carpetas Legacy

Las carpetas `JPG/`, `PNG/`, `SVG/`, `PDF/` contienen los archivos originales. 

**⚠️ IMPORTANTE**: No eliminar hasta verificar que todas las rutas nuevas funcionan correctamente.

---

## 📞 Consultas

Para más detalles, consulta `IMAGE_STRUCTURE.md` en este mismo directorio.

*Última actualización: 2025-11-13*

