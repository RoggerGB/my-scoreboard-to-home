# Scoreboard Backend

Backend en Node.js + TypeScript para sincronizar en tiempo real el marcador del frontend.

## Caracteristicas

- API REST para leer y actualizar el estado del partido.
- Socket.IO para sincronizacion en tiempo real entre `/`, `/control` y `/admin`.
- Validacion de payloads con Zod.
- Persistencia del estado en `data/match-state.json`.
- Reloj de partido centralizado en backend (incrementa cada segundo).

## Requisitos

- Node.js 20+

## Configuracion

1. Copia `.env.example` a `.env`.
2. Ajusta variables si hace falta:

```env
PORT=4000
FRONTEND_ORIGIN=http://localhost:5173
STATE_FILE=./data/match-state.json
```

`FRONTEND_ORIGIN` soporta multiples origenes separados por coma.

## Scripts

- `npm run dev`: arranque en modo desarrollo.
- `npm run build`: compila TypeScript a `dist`.
- `npm start`: ejecuta backend compilado.

## Endpoints REST

- `GET /health`
- `GET /api/match/state`
- `PUT /api/match/state`
- `PATCH /api/match/state`
- `POST /api/match/reset`

### Payload de estado

```json
{
  "localName": "EQUIPO A",
  "awayName": "EQUIPO B",
  "localScore": 0,
  "awayScore": 0,
  "period": 1,
  "timeSeconds": 0,
  "startTime": "21:00"
}
```

## Eventos Socket.IO

- Servidor -> cliente:
  - `match:state` (estado completo del partido)
- Cliente -> servidor:
  - `match:get`
  - `match:set` (estado completo)
  - `match:patch` (estado parcial)
  - `match:reset`

Los cambios por REST y por Socket se emiten automaticamente a todos los clientes conectados.
