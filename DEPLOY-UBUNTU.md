# Deploy en Ubuntu Server con Docker

## 1) Requisitos

- Ubuntu Server 22.04+.
- Docker Engine + Docker Compose plugin.
- Puerto `80` abierto en firewall/security group.

## 2) Instalacion rapida de Docker (si no esta instalado)

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo $VERSION_CODENAME) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable docker
sudo systemctl start docker
```

## 3) Levantar proyecto

Desde la carpeta raiz del repo:

```bash
docker compose build
docker compose up -d
```

## 4) Verificar estado

```bash
docker compose ps
docker compose logs -f backend
docker compose logs -f frontend
```

Healthcheck backend:

```bash
curl http://localhost/api/match/state
```

Abrir en navegador:

- `http://IP_DEL_SERVIDOR/`
- `http://IP_DEL_SERVIDOR/control`
- `http://IP_DEL_SERVIDOR/admin`

## 5) Persistencia

El estado del partido se guarda en:

- `scoreboard-backend/data/match-state.json`

Ese directorio esta montado como volumen en compose para mantener datos entre reinicios.

## 6) Comandos utiles

Reiniciar stack:

```bash
docker compose restart
```

Actualizar tras cambios de codigo:

```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```
