# School core API

Core backend for school web application.

## Installation

```bash
$ pnpm install
$ cp .env.template .env
$ nvm use # to set the node version.
```

## Project structure

```
└── src/
    ├── common/
    │   ├── types
    │   ├── middleware
    │   ├── guard
    │   ├── interceptor
    │   └── service/
    │       ├── auth
    │       └── email
    ├── database/
    │   └── entities/
    │       ├── student.entity.ts
    │       └── teacher.entity.ts
    └── domain/
        └── student/
            ├── mapper/
            │   └── student.mapper.ts
            ├── usecases/
            │   ├── commands/
            │   │   ├── add-student.command.ts
            │   │   └── add-student.handler.ts
            │   └── queries/
            │       ├── get-students-query.ts
            │       └── get-students.handler.ts
            ├── dto/
            │   └── request/
            │       └── add-student-request.dto.ts
            ├── student.controller.ts
            ├── student.controller.test.ts
            ├── student.repository.ts
            ├── student.util.ts
            ├── student.module.ts
            └── Student.ts
```

`common` - hold reusable code that can be used across the codebase regardless of domain. For example, middleware, guard,
and etc.

> 💡 `common/service` hold modules that does not relevant to the business domain. For example, `auth`, `email`.

`database` - contain `entities` that hold database entity. When adding new database table, corresponding new entity
should be created.

`domain` - hold important components such as `controller`, `repository`, `usecases` and etc. `commands` and `queries`
are following [cqrs](https://docs.nestjs.com/recipes/cqrs) and also following domain driven design.

## Running Oracle 19c locally

1. Dowloading docker image for Oracle 19c by
   following [this instruction](https://github.com/steveswinsburg/oracle19c-docker?tab=readme-ov-file#before-you-begin)
2. After you download neccessary file for building docker image, now you can run below command to build official Oracle
   19c image.

```bash
cd OracleDatabase/SingleInstance/dockerfiles
./buildContainerImage.sh -v 19.3.0 -e
```

3. Once the docker image is successfully built, create a mounted directory for it. For example, `/tmp/oracle/oradata`.

4. We also need to allow Oracle UID (54321) to access the mounted folder.

```bash
sudo chown -R 54321:54321 /tmp/oracle/oradata
```

5. Now we can run the docker image. If you're running it for the first time, it will take 10-15 minutes for database to
   be setup. You can check the progress logs from Docker desktop.

```bash
docker run \
--name oracle19c \
-p 1521:1521 \
-p 5500:5500 \
-e ORACLE_PDB=orcl \
-e ORACLE_PWD=admin \
-e INIT_SGA_SIZE=3000 \
-e INIT_PGA_SIZE=1000 \
-v /tmp/oracle/oradata:/opt/oracle/oradata \
-d \
oracle/database:19.3.0-ee
```

6. BONUS: You can spin up NestJS, Redis, and Oracle 19c altogether via [docker-compose.yaml](./docker-compose.yaml).
   Here's an example of the `.env`.

```
DATABASE_USERNAME=system
DATABASE_PASSWORD=admin
DATABASE_CONNECT_STRING="(DESCRIPTION=(retry_count=20)(retry_delay=3)(ADDRESS=(PROTOCOL=TCP)(HOST=oracle)(PORT=1521))(CONNECT_DATA=(SID=ORCLCDB)))"
```

## Running Redis locally

```bash
docker run -p 6379:6379 -d redis
```

## Connect to Oracle database clould

In order to connect to Oracle DB (dev), these credentials are required. Please contact your team leader or devops
engineer for credentials.

```bash
DATABASE_USERNAME=ADMIN
DATABASE_PASSWORD=
DATABSE_CONNECT_STRING=
```

## Seeding database

Once Oracle 19c is up and running, some data need to be seed to the database to make the (local) app work properly.

1. To create a user with admin role, ensure that following enviroment variables are set.

```bash
SEED_FIREBASE_UID=your_firebase_uid
SEED_USER_EMAIL=your_firebase_user_email
```

2. Run following command to seed database

```bash
$ cd packages/school-core-api
$ pnpm db:seed
$ pnpm system-user:seed (only first time)
$ pnpm policy:seed
```

To seed essential data to the database for importing Student,

run:

```bash
pnpm run grade-level:seed
```

This command will populate the following entities:

- UserEntity
- SchoolBuildingEntity
- SchoolRoomEntity
- TeacherEntity
- AcademicYearEntity
- SemesterEntity
- ClassGradeEntity
- ClassGradeUnitEntity

You can then import Students using the path `/student/bulk-register`

For seeding timetable configuration data, use:

```bash
pnpm run timetable-config:seed
```

This command will populate the following entities:

- PeriodEntity
- TimetableConfigEntity

3. Once seeding database complete, the provided firebase email from step 1 will be used to create a user with **ADMIN**
   role.

## Migration process

We expect that you alredy have database user/schema on your local developmemt setup. If not, please create one and
grant `DBA` access to your database user.

1. Ensure that following enviroment variables are in .env or environment variables.

```bash
DATABASE_USERNAME=pluton # Database schema/username.
DATABASE_PASSWORD=xxx
DATABASE_CONNECT_STRING=localhost:1521/orcl
```

2. Run typeorm script to create a migration file.

```bash
pnpm migration:create CreateMyTable
# or auto generate migration file from defined entities.
pnpm migration:generate CreateMyTable
```

3. Run migration command to update the database schema.

```bash
pnpm migration:run
```

4. To revert, run the following script

```bash
pnpm migration:revert
```
