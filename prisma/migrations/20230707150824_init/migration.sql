-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Month" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "personId" TEXT NOT NULL,
    CONSTRAINT "Month_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Week" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "week" INTEGER NOT NULL,
    "monthId" TEXT NOT NULL,
    CONSTRAINT "Week_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Month" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Day" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayStart" DATETIME NOT NULL,
    "lunchStart" DATETIME NOT NULL,
    "lunchEnd" DATETIME NOT NULL,
    "dayEnd" DATETIME NOT NULL,
    "weekId" TEXT NOT NULL,
    CONSTRAINT "Day_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
