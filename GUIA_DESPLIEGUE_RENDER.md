# 🚀 Guía Completa: Desplegar tu Aplicación Web en Render desde Termux

Esta guía te llevará paso a paso para desplegar tu aplicación **Express.js + React + PostgreSQL** en Render usando Termux en tu dispositivo Android.

---

## 📋 Prerequisitos

### 1. Instalar Termux y Paquetes Necesarios

Abre Termux en tu Android y ejecuta:

```bash
# Actualizar paquetes de Termux
pkg update && pkg upgrade

# Instalar Git y Node.js
pkg install git nodejs-lts

# Verificar las instalaciones
node -v
npm -v
git --version
```

### 2. Crear Cuenta en Render

1. Desde el navegador de tu teléfono, ve a: **https://render.com**
2. Haz clic en **"Sign Up"** (Registrarse)
3. Elige **"Sign up with GitHub"** (si tienes cuenta de GitHub) o crea una cuenta nueva
4. Confirma tu correo electrónico

---

## 🔧 Paso 1: Preparar tu Proyecto

### 1.1 Navegar a tu Proyecto en Termux

```bash
# Navega al directorio de tu proyecto
cd ~
cd storage/shared  # o donde esté tu proyecto
cd nombre-de-tu-proyecto
```

### 1.2 Verificar que el Proyecto Esté Listo

Tu proyecto ya tiene los archivos necesarios:
- ✅ `package.json` - con scripts de build y start
- ✅ `render.yaml` - configuración para Render
- ✅ `.gitignore` - archivos a ignorar en Git

---

## 📦 Paso 2: Subir tu Código a GitHub

### 2.1 Configurar Git (Primera vez)

```bash
# Configura tu nombre y correo
git config --global user.name "TuNombre"
git config --global user.email "tu.email@ejemplo.com"
```

### 2.2 Inicializar Repositorio Git

```bash
# Inicializar Git en tu proyecto
git init

# Añadir todos los archivos
git add .

# Hacer el primer commit
git commit -m "Preparar aplicación para Render"
```

### 2.3 Crear Repositorio en GitHub

**Opción A: Usando GitHub CLI (Recomendado)**

```bash
# Instalar GitHub CLI
pkg install gh

# Autenticarse en GitHub
gh auth login
# Sigue las instrucciones:
# 1. Selecciona: GitHub.com
# 2. Selecciona: HTTPS
# 3. Selecciona: Login with a web browser
# 4. Copia el código que te da
# 5. Presiona Enter
# 6. Se abrirá el navegador, pega el código y autoriza

# Crear repositorio y subir código
gh repo create enviospro --public --source=. --remote=origin --push
```

**Opción B: Manual (desde el navegador)**

1. Abre **https://github.com** en tu navegador móvil
2. Haz clic en **"+"** → **"New repository"**
3. Nombre del repositorio: `enviospro` (o el que prefieras)
4. Selecciona **Public** o **Private**
5. **NO marques** "Add a README file"
6. Haz clic en **"Create repository"**
7. Copia la URL del repositorio (ejemplo: `https://github.com/TuUsuario/enviospro.git`)

En Termux, ejecuta:

```bash
# Conectar tu proyecto con el repositorio
git remote add origin https://github.com/TuUsuario/enviospro.git

# Subir el código
git branch -M main
git push -u origin main
```

**Nota:** Si te pide contraseña, usa un **Personal Access Token** en lugar de tu contraseña:
- Ve a GitHub → Settings → Developer settings → Personal access tokens → Generate new token
- Dale permisos de `repo`
- Copia el token y úsalo como contraseña

---

## 🗄️ Paso 3: Crear Base de Datos PostgreSQL en Render

1. Ve a **https://dashboard.render.com** en tu navegador
2. Haz clic en **"New +"** → **"PostgreSQL"**
3. Configura la base de datos:
   - **Name:** `enviospro-db`
   - **Database:** `enviospro` (o déjalo en blanco)
   - **User:** `enviospro` (o déjalo en blanco)
   - **Region:** Elige **Frankfurt** (o el más cercano a España)
   - **PostgreSQL Version:** **17** (última versión)
   - **Plan:** Selecciona **Free** (gratis, válido por 90 días)
4. Haz clic en **"Create Database"**
5. Espera 1-2 minutos a que se cree
6. Una vez creada, verás la página de la base de datos

**⚠️ IMPORTANTE:** Guarda la **Internal Database URL** (la necesitarás después)
- En la página de la base de datos, busca **"Connections"**
- Copia la **"Internal Database URL"** (empieza con `postgresql://`)

---

## 🌐 Paso 4: Desplegar la Aplicación Web en Render

### 4.1 Crear Web Service

1. En Render Dashboard, haz clic en **"New +"** → **"Web Service"**
2. Haz clic en **"Connect a repository"** → **"Connect GitHub"**
3. Autoriza a Render para acceder a tus repositorios
4. Busca y selecciona tu repositorio `enviospro`
5. Haz clic en **"Connect"**

### 4.2 Configurar el Servicio

Completa los campos:

| Campo | Valor |
|-------|-------|
| **Name** | `enviospro-web` (o el nombre que quieras) |
| **Region** | **Frankfurt** (MISMO que la base de datos) |
| **Branch** | `main` |
| **Root Directory** | Déjalo vacío |
| **Runtime** | **Node** |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Plan** | Selecciona **Free** |

### 4.3 Variables de Entorno

1. Baja hasta **"Environment Variables"**
2. Haz clic en **"Add Environment Variable"**
3. Añade estas variables:

**Variable 1:**
- **Key:** `NODE_ENV`
- **Value:** `production`

**Variable 2:**
- **Key:** `DATABASE_URL`
- **Value:** Pega aquí la **Internal Database URL** que copiaste antes
  - Ejemplo: `postgresql://enviospro_user:password123@dpg-xxxxx-a.frankfurt-postgres.render.com/enviospro_db`

### 4.4 Iniciar el Despliegue

1. Revisa que todo esté correcto
2. Haz clic en **"Create Web Service"**
3. Render comenzará a:
   - Clonar tu código desde GitHub
   - Instalar dependencias (`npm install`)
   - Construir la aplicación (`npm run build`)
   - Iniciar el servidor (`npm start`)

**El primer despliegue toma 3-5 minutos** ⏱️

### 4.5 Monitorear el Despliegue

- Verás los **logs en tiempo real** en pantalla
- Busca mensajes como:
  - ✅ `Build successful`
  - ✅ `Your service is live`
- Si hay errores, aparecerán en rojo

---

## 🎉 Paso 5: Acceder a tu Aplicación

Una vez que el despliegue termine exitosamente:

1. En la parte superior verás tu **URL pública**:
   - Ejemplo: `https://enviospro-web.onrender.com`
2. Haz clic en la URL o cópiala
3. **¡Tu aplicación está en línea!** 🚀

---

## 🔄 Paso 6: Actualizar tu Aplicación (Futuras Actualizaciones)

Cada vez que quieras actualizar tu app:

### Desde Termux:

```bash
# 1. Haz cambios en tu código (edita archivos)

# 2. Guarda los cambios en Git
git add .
git commit -m "Descripción de los cambios"

# 3. Sube a GitHub
git push origin main
```

**Render automáticamente detectará los cambios** y redeslegará tu aplicación.

---

## 🔧 Configuración de la Base de Datos

### Ejecutar Migraciones de Base de Datos

Después del primer despliegue, necesitas configurar las tablas de la base de datos:

1. En Render Dashboard, ve a tu **Web Service** (`enviospro-web`)
2. Ve a la pestaña **"Shell"** en el menú lateral
3. Haz clic en **"Launch Shell"**
4. En la terminal que se abre, ejecuta:

```bash
npm run db:push
```

Esto creará todas las tablas necesarias en tu base de datos PostgreSQL.

---

## ❓ Solución de Problemas Comunes

### ❌ Error: "Build failed"

**Problema:** El build no se completó
**Solución:**
1. Revisa los logs en Render
2. Asegúrate que `package.json` tenga el script `build`
3. Verifica que todas las dependencias estén en `package.json`

### ❌ Error: "Cannot connect to database"

**Problema:** La app no puede conectarse a PostgreSQL
**Solución:**
1. Verifica que `DATABASE_URL` esté en las variables de entorno
2. Asegúrate de usar la **Internal Database URL**
3. Verifica que la base de datos y el web service estén en la **misma región**

### ❌ Error: "Port already in use"

**Problema:** El puerto está ocupado
**Solución:**
- Tu código debe usar `process.env.PORT` (ya está configurado ✅)
- Render asigna el puerto automáticamente

### ❌ La app se "duerme" después de 15 minutos

**Esto es normal en el plan Free:**
- La app se apaga después de 15 minutos de inactividad
- Se reactiva automáticamente cuando alguien la visita
- El primer acceso puede tardar 30-60 segundos (cold start)

### 🔐 Error de Autenticación en Git (Termux)

Si Git te pide contraseña:

```bash
# Usa un token de acceso personal como contraseña
# O configura la URL con el token:
git remote set-url origin https://TU_TOKEN@github.com/TuUsuario/enviospro.git
```

---

## 📊 Monitoreo y Gestión

### Ver Logs de tu Aplicación

1. Ve a Render Dashboard
2. Selecciona tu servicio `enviospro-web`
3. Haz clic en **"Logs"** en el menú lateral
4. Verás todos los logs en tiempo real

### Ver la Base de Datos

1. Ve a Render Dashboard
2. Selecciona tu base de datos `enviospro-db`
3. Copia la **External Connection String**
4. Usa un cliente como **pgAdmin** o **TablePlus** para conectarte

---

## 🎯 Comandos Rápidos de Referencia

### Termux - Actualizar la App

```bash
# Workflow completo
cd ~/storage/shared/tu-proyecto
git add .
git commit -m "Actualización"
git push origin main
# ¡Render desplegará automáticamente!
```

### Verificar el Estado

```bash
# Ver status de Git
git status

# Ver commits recientes
git log --oneline -5

# Ver archivos modificados
git diff
```

---

## ✅ Checklist Final

Antes de considerarlo completado, verifica:

- [ ] Código subido a GitHub
- [ ] Base de datos PostgreSQL creada en Render
- [ ] Web Service creado y desplegado
- [ ] Variables de entorno configuradas (`NODE_ENV`, `DATABASE_URL`)
- [ ] Migraciones de base de datos ejecutadas (`npm run db:push`)
- [ ] Aplicación accesible desde la URL pública
- [ ] Sin errores en los logs

---

## 🌟 Ventajas de Render

✅ **HTTPS gratuito** - Certificado SSL automático
✅ **Despliegue automático** - Push a GitHub = nueva versión
✅ **Sin tarjeta de crédito** - Plan gratuito real
✅ **PostgreSQL incluido** - Base de datos gratis (90 días)
✅ **Compatible con Termux** - Todo funciona desde Android

---

## 🔗 Enlaces Útiles

- **Tu Dashboard de Render:** https://dashboard.render.com
- **Documentación de Render:** https://render.com/docs
- **GitHub:** https://github.com
- **Termux:** https://termux.dev

---

## 💡 Consejos Adicionales

1. **Backups de la Base de Datos:**
   - Render hace backups automáticos en planes pagos
   - En el plan gratuito, exporta tu base de datos regularmente

2. **Dominio Personalizado:**
   - Puedes añadir un dominio propio (ej: `enviospro.com`)
   - Ve a Settings → Custom Domains en Render

3. **Monitoreo:**
   - Render te notifica por email si hay errores
   - Configura alertas en Settings → Notifications

4. **Rendimiento:**
   - El plan Free tiene cold starts (15 min de inactividad)
   - Para eliminar esto, actualiza a un plan de pago ($7/mes)

---

¡**Felicitaciones!** 🎉 Tu aplicación está desplegada y accesible en internet desde cualquier parte del mundo.

**URL de tu app:** `https://enviospro-web.onrender.com`
(reemplaza con tu URL real)

---

*Guía creada para despliegue desde Termux a Render - 2025*
