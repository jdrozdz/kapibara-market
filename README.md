# Preparing local test environment

## Stack:
- OS: Windows/OsX/Linux (Linux and OsX are preferred)
- Node.JS (min. ver. 20.0.0)
- Podman or docker to create PostgreSQL container or install db instance locally

## Creating container with podman
### Arch Linux version

#### Install podman as root or using sudo
```bash
  sudo pacman -S podman podman-docker podman-compose
```

#### Prepare database instance
Store password as podman `env`
```bash
    printf 'Str0n9-P@@$$w0rd' | podman secret create for-special-instance-pass -
```

#### Run PostgreSQL instance, use `env-name` which was created above (`for-special-instance-pass`)
```bash
    podman run -d --name instance-app --secret for-special-instance-pass,type=env,target=POSTGRES_PASSWORD -e POSTGRES_USER=some-incredibly-user -v /var/lib/data -p 5432:5432 postgres:latest
```

### Test it
If you don't have postgres client, install it
```bash
    sudo pacman -S pgcli
```
Now you can test it:
```bash
    set +o history && PGPASSWORD='Str0n9-P@@$$w0rd' pgsql -h localhost -U some-incredibly-user
```

>**REMEMBER**<br />
> Command `set +o history` disable `history` in shell for current session. To enable it again just type `set -o history`