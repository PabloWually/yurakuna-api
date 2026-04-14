# Yurakuna API

API para gestión de productos (hortalizas) construida con arquitectura DDD.

## Tecnologías

- **Runtime:** Bun
- **Framework:** Hono
- **Base de datos:** PostgreSQL (Supabase)
- **ORM:** Drizzle ORM
- **Validación:** Zod
- **Autenticación:** JWT + Refresh Tokens (jose)
- **Deployment:** Cloudflare Workers
- **Arquitectura:** Domain-Driven Design (DDD)

## Estructura del Proyecto

```
src/
├── domain/              # Capa de dominio
│   ├── entities/        # Entidades del dominio
│   ├── repositories/    # Interfaces de repositorios
│   └── valueObjects/    # Value Objects
├── application/         # Capa de aplicación
│   └── useCases/       # Casos de uso
├── infrastructure/      # Capa de infraestructura
│   ├── database/       # Esquemas y conexión DB
│   ├── repositories/   # Implementación de repositorios
│   └── security/       # Utilidades de seguridad
├── presentation/        # Capa de presentación
│   ├── routes/         # Rutas HTTP
│   └── middleware/     # Middleware
└── shared/             # Código compartido
    ├── types/          # Tipos compartidos
    └── errors/         # Errores personalizados
```

## Funcionalidades

- ✅ Gestión de productos
- ✅ Gestión de clientes
- ✅ Gestión de pedidos
- ✅ Control de stock
- ✅ Control de merma
- ✅ Gestión de entregas
- ✅ Autenticación JWT con refresh tokens
- ✅ Sistema RBAC (Role-Based Access Control)
- ✅ Gestión de usuarios

## Roles y Permisos

### Roles
- **administrador**: Acceso completo al sistema
- **usuario**: Gestión operativa (productos, pedidos, clientes)
- **cliente**: Acceso limitado (ver productos, crear pedidos propios)

### Estados de Pedido
- `draft`: Borrador
- `confirmed`: Confirmado
- `delivered`: Entregado
- `cancelled`: Cancelado

### Unidades de Medida
- `kg`: Kilogramos
- `lb`: Libras
- `unidades`: Unidades individuales

### Causas de Merma
- `dañado`: Producto dañado
- `caducado`: Producto caducado

## Instalación

```bash
# Instalar dependencias
bun install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Generar migraciones
bun run db:generate

# Ejecutar migraciones
bun run db:migrate
```

## Desarrollo

```bash
# Modo desarrollo con hot reload
bun run dev

# Ver base de datos (Drizzle Studio)
bun run db:studio
```

## Variables de Entorno

```env
DATABASE_URL=postgresql://user:password@localhost:5432/yurakuna
JWT_SECRET=your-secret-key-here-change-in-production
JWT_REFRESH_SECRET=your-refresh-secret-key-here-change-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
PORT=3000
```

## API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/refresh` - Renovar access token
- `POST /api/auth/logout` - Cerrar sesión
- `POST /api/auth/logout-all` - Cerrar todas las sesiones

### Productos
- `GET /api/products` - Listar productos (paginado)
- `GET /api/products/:id` - Obtener producto
- `POST /api/products` - Crear producto (admin/usuario)
- `PATCH /api/products/:id` - Actualizar producto (admin/usuario)
- `DELETE /api/products/:id` - Eliminar producto (admin)
- `POST /api/products/:id/stock` - Ajustar stock (admin/usuario)

### Pedidos
- `GET /api/orders` - Listar pedidos (paginado)
- `GET /api/orders/:id` - Obtener pedido
- `POST /api/orders` - Crear pedido
- `PATCH /api/orders/:id` - Actualizar pedido (admin/usuario)
- `GET /api/orders/client/:clientId` - Pedidos por cliente

## Deployment (Cloudflare Workers)

El despliegue a producción queda automatizado por GitHub Actions en cada push a `main`.

Secrets requeridos en GitHub:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`

El workflow sincroniza los secrets del Worker y luego publica la versión de producción.

Recomendado para producción con Supabase (Workers/serverless):

- Usar `DATABASE_URL` del pooler en **transaction mode** (puerto `6543`).
- Mantener TLS habilitado (`sslmode=require` en la URL de conexión).
- Evitar URLs directas de sesión (ej: `5432`) para tráfico de API en serverless, porque elevan riesgo de saturación de conexiones y costo.
- Variables opcionales de tuning (con defaults seguros en código):
  - `DB_MAX_CONNECTIONS=1`
  - `DB_IDLE_TIMEOUT_SECONDS=20`
  - `DB_CONNECT_TIMEOUT_SECONDS=10`
  - `DB_MAX_LIFETIME_SECONDS=1800`

```bash
# Deploy local/manual si hace falta
bun run deploy:production
```

## Ejemplo de Uso

### Registro
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123",
    "name": "Admin User",
    "role": "administrador"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

### Crear Producto
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "name": "Tomate",
    "description": "Tomate fresco",
    "unit": "kg",
    "pricePerUnit": 2.50,
    "currentStock": 100
  }'
```

## Seguridad

- JWT con expiración corta (15 minutos por defecto)
- Refresh tokens con rotación automática
- Contraseñas hasheadas con PBKDF2 (compatible con Cloudflare Workers)
- Control de acceso basado en roles (RBAC)
- Validación de datos con Zod
- Conexión PostgreSQL endurecida para producción serverless (TLS, límite de pool y timeouts)

## Licencia

MIT
