# ✅ CHECKLIST ANTES DE EJECUTAR EL BOT

Marca cada item cuando lo completes:

## 1️⃣ Variables de Entorno en Secrets

Abre la pestaña **Tools > Secrets** en Replit y agrega:

- [ ] **BOT_TOKEN** - Token de @BotFather
- [ ] **CHANNEL_ID** - ID del canal (ejemplo: -1001234567890)
- [ ] **CHANNEL_USERNAME** - Username del canal (ejemplo: @mi_canal) [OPCIONAL si tienes CHANNEL_ID]
- [ ] **OWNER_TELEGRAM_ID** - Tu ID de Telegram
- [ ] **DATABASE_URL** - URL de PostgreSQL
- [ ] **ORS_API_KEY** - API Key de OpenRouteService
- [ ] **ADMIN_TOKEN** - Token de seguridad (genera uno aleatorio)

## 2️⃣ Dependencias Instaladas

- [ ] Ejecutaste: `bash "EJECUTAR EN REPLIT/instalar_dependencias.sh"`
- [ ] No hubo errores en la instalación

## 3️⃣ Verificaciones Previas

- [ ] El bot está activo en @BotFather
- [ ] Tienes acceso al canal privado configurado
- [ ] La base de datos PostgreSQL está funcionando

## 4️⃣ Ejecutar el Bot

- [ ] Ejecutaste: `bash "EJECUTAR EN REPLIT/ejecutar_bot.sh"`
- [ ] El bot se conectó sin errores
- [ ] Enviaste `/start` al bot en Telegram
- [ ] El bot respondió correctamente

---

## 🎉 Si todos los items están marcados, ¡tu bot está funcionando!

Si tienes problemas, revisa los logs en el Shell de Replit.
