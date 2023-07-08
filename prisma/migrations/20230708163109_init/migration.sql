-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Day" (
    "dayStart" DATETIME NOT NULL,
    "lunchStart" DATETIME NOT NULL,
    "lunchEnd" DATETIME NOT NULL,
    "dayEnd" DATETIME NOT NULL,
    "personId" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,

    PRIMARY KEY ("personId", "day", "month", "year"),
    CONSTRAINT "Day_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
