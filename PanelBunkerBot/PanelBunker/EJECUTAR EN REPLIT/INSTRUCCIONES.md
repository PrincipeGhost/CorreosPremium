# 🚀 INSTRUCCIONES PARA EJECUTAR EL BOT EN REPLIT

## ✅ PASO 1: Configurar las Variables de Entorno (Secretos)

El bot necesita las siguientes variables de entorno que debes configurar en los **Secrets de Replit**:

### Variables Obligatorias:

1. **BOT_TOKEN**
   - Token de tu bot de Telegram
   - Lo obtienes de @BotFather en Telegram
   - Ejemplo: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`

2. **CHANNEL_ID** 
   - ID del canal privado de Telegram
   - Ejemplo: `-1001234567890`
   - Nota: Si usas CHANNEL_USERNAME, este es opcional

3. **CHANNEL_USERNAME** (alternativa a CHANNEL_ID)
   - Username del canal de Telegram
   - Ejemplo: `@tu_canal_privado`

4. **OWNER_TELEGRAM_ID**
   - Tu ID de Telegram (puedes obtenerlo con @userinfobot)
   - Ejemplo: `123456789`

5. **DATABASE_URL**
   - URL de conexión a PostgreSQL
   - Puedes usar la base de datos de Replit o una externa como Neon.tech
   - Ejemplo: `postgresql://usuario:password@host:5432/database`

6. **ORS_API_KEY**
   - API Key de OpenRouteService (gratis)
   - Regístrate en: https://openrouteservice.org/
   - Ejemplo: `5b3ce3597851110001cf6248abc123def456ghi789jkl`

7. **ADMIN_TOKEN**
   - Token de seguridad para la API (genera uno aleatorio)
   - Ejemplo: `mi_token_super_secreto_123`

---

## ✅ PASO 2: Instalar Dependencias

En el Shell de Replit, ejecuta:

```bash
cd "EJECUTAR EN REPLIT"
bash instalar_dependencias.sh
```

---

## ✅ PASO 3: Ejecutar el Bot

Una vez configuradas las variables y las dependencias instaladas, ejecuta:

```bash
bash ejecutar_bot.sh
```

O simplemente usa el Workflow "Telegram Bot" que ya está configurado.

---

## 📝 NOTAS IMPORTANTES:

- ⚠️ **NO compartas tus tokens o API keys con nadie**
- ✅ Asegúrate de que todas las variables estén configuradas antes de ejecutar
- 🔄 Si el bot no funciona, revisa los logs en el Shell
- 💾 La base de datos se creará automáticamente en el primer inicio
- 📡 El bot funcionará mientras Replit esté ejecutando

---

## 🆘 SOLUCIÓN DE PROBLEMAS:

1. **Error de BOT_TOKEN**: Verifica que el token esté correcto en los Secrets
2. **Error de DATABASE_URL**: Asegúrate de que la URL de la base de datos sea válida
3. **Bot no responde**: Verifica que el bot esté activo en @BotFather
4. **Error de canal**: Verifica que CHANNEL_ID o CHANNEL_USERNAME sean correctos

---

¡Listo! Tu bot debería estar funcionando en Replit 🎉
