-- Add location table - represent a restaurant's location
-- add reference for user reference a location
CREATE TABLE User (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Role ENUM('Chef', 'Waiter', 'Customer', 'Owner') NOT NULL,
    ContactDetails VARCHAR(255),
    Login VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ModificationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- no modification needed
CREATE TABLE Dish (
    DishID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    PreparationTime INT NOT NULL,
    ImageLink VARCHAR(255),
    CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ModificationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Menu should associate with one location only
CREATE TABLE Menu (
    MenuID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ModificationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- no modification needed
CREATE TABLE MenuDish (
    MenuID INT,
    DishID INT,
    Status ENUM('Available', 'Unavailable') NOT NULL,
    PRIMARY KEY (MenuID, DishID),
    FOREIGN KEY (MenuID) REFERENCES Menu(MenuID) ON DELETE CASCADE,
    FOREIGN KEY (DishID) REFERENCES Dish(DishID) ON DELETE CASCADE
);

-- add reference to location
CREATE TABLE DiningTable (
    TableID INT AUTO_INCREMENT PRIMARY KEY,
    Capacity INT NOT NULL,
    Location VARCHAR(255)
);

-- add reference to location
CREATE TABLE Reservation (
    ReservationID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    TableID INT,
    ReservationTime TIMESTAMP NOT NULL,
    SpecialRequests TEXT,
    Status ENUM('Pending', 'Confirmed', 'Cancelled') NOT NULL,
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE,
    FOREIGN KEY (TableID) REFERENCES DiningTable(TableID) ON DELETE CASCADE
);

-- add reference to location
CREATE TABLE MealOrder (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    TableID INT,
    OrderTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Pending', 'Preparing', 'Served', 'Completed') NOT NULL,
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE,
    FOREIGN KEY (TableID) REFERENCES DiningTable(TableID) ON DELETE CASCADE
);

-- add reference to location
CREATE TABLE OrderItem (
    OrderItemID INT AUTO_INCREMENT PRIMARY KEY,
    OrderID INT,
    DishID INT,
    Quantity INT NOT NULL,
    SpecialRequests TEXT,
    FOREIGN KEY (OrderID) REFERENCES MealOrder(OrderID) ON DELETE CASCADE,
    FOREIGN KEY (DishID) REFERENCES Dish(DishID) ON DELETE CASCADE
);

-- add reference to location
CREATE TABLE Receipt (
    ReceiptID INT AUTO_INCREMENT PRIMARY KEY,
    OrderID INT,
    Amount DECIMAL(10, 2) NOT NULL,
    PaymentMethod ENUM('Cash', 'Card', 'Online') NOT NULL,
    PaymentTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (OrderID) REFERENCES MealOrder(OrderID) ON DELETE CASCADE
);

-- add reference to location
CREATE TABLE Report (
    ReportID INT AUTO_INCREMENT PRIMARY KEY,
    ReportType ENUM('Daily', 'Monthly', 'Yearly') NOT NULL,
    GeneratedTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Content TEXT
);

-- no need modification
CREATE TABLE Revenue (
    RevenueID INT AUTO_INCREMENT PRIMARY KEY,
    Amount DECIMAL(10, 2) NOT NULL,
    Date DATE NOT NULL
);


-- Fix code:
CREATE TABLE Location (
    LocationID INT AUTO_INCREMENT PRIMARY KEY,
    Address VARCHAR(255) NOT NULL,
    City VARCHAR(255) NOT NULL,
    State VARCHAR(255) NOT NULL,
    ZipCode VARCHAR(10),
    Country VARCHAR(255) NOT NULL,
    CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ModificationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
ALTER TABLE User
ADD COLUMN LocationID INT,
ADD FOREIGN KEY (LocationID) REFERENCES Location(LocationID) ON DELETE SET NULL;
ALTER TABLE Menu
ADD COLUMN LocationID INT,
ADD FOREIGN KEY (LocationID) REFERENCES Location(LocationID) ON DELETE CASCADE;
ALTER TABLE DiningTable
ADD COLUMN LocationID INT,
ADD FOREIGN KEY (LocationID) REFERENCES Location(LocationID) ON DELETE CASCADE;
ALTER TABLE Reservation
ADD COLUMN LocationID INT,
ADD FOREIGN KEY (LocationID) REFERENCES Location(LocationID) ON DELETE CASCADE;
ALTER TABLE MealOrder
ADD COLUMN LocationID INT,
ADD FOREIGN KEY (LocationID) REFERENCES Location(LocationID) ON DELETE CASCADE;
ALTER TABLE Receipt
ADD COLUMN LocationID INT,
ADD FOREIGN KEY (LocationID) REFERENCES Location(LocationID) ON DELETE CASCADE;
ALTER TABLE Report
ADD COLUMN LocationID INT,
ADD FOREIGN KEY (LocationID) REFERENCES Location(LocationID) ON DELETE CASCADE;
CREATE VIEW UserFullInfo AS
SELECT
    u.UserID,
    u.Name,
    u.Role,
    u.ContactDetails,
    u.Login,
    u.CreationDate,
    u.LocationID,
    u.ModificationDate,
    CONCAT(l.Address, ', ', l.City, ', ', l.State, ' ', l.ZipCode, ', ', l.Country) AS Location
FROM
    User u
LEFT JOIN
    Location l ON u.LocationID = l.LocationID;

ALTER TABLE OrderItem
ADD COLUMN Status ENUM('ordered', 'preparing', 'cancelled', 'delivered', 'completed') NOT NULL DEFAULT 'ordered' AFTER Quantity;

-- Step 1: Add the new columns to the Dish table
ALTER TABLE Dish
ADD COLUMN CreatedBy INT,
ADD COLUMN ModifiedBy INT;

-- Step 2: Add foreign key constraints
ALTER TABLE Dish
ADD CONSTRAINT FK_CreatedBy FOREIGN KEY (CreatedBy) REFERENCES User(UserID),
ADD CONSTRAINT FK_ModifiedBy FOREIGN KEY (ModifiedBy) REFERENCES User(UserID);


CREATE TABLE Enquiries (
    EnquiryID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    Status ENUM('Pending', 'In Progress', 'Resolved', 'Closed') NOT NULL DEFAULT 'Pending',
    CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ModifyDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    Topic VARCHAR(255),
    Description TEXT,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

ALTER TABLE Menu
ADD COLUMN CreatedBy INT,
ADD COLUMN ModifiedBy INT;

ALTER TABLE Menu
ADD CONSTRAINT MenuFK_CreatedBy FOREIGN KEY (CreatedBy) REFERENCES User(UserID),
ADD CONSTRAINT MenuFK_ModifiedBy FOREIGN KEY (ModifiedBy) REFERENCES User(UserID);

CREATE TABLE Category (
    CategoryID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT
);

ALTER TABLE Dish
ADD COLUMN CategoryID INT;

ALTER TABLE Dish
ADD CONSTRAINT FK_Dish_Category FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID);

-- Altering the Category table
ALTER TABLE Category
ADD COLUMN CreatedBy INT,
ADD COLUMN ModifiedBy INT,
ADD COLUMN CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN ModificationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
ADD CONSTRAINT Cat_fk_created_by FOREIGN KEY (CreatedBy) REFERENCES User(UserID),
ADD CONSTRAINT Cat_fk_modified_by FOREIGN KEY (ModifiedBy) REFERENCES User(UserID);

-- Drop the view if it exists
DROP VIEW IF EXISTS DishWithCategory;

-- Create the view again
CREATE VIEW DishWithCategory AS
SELECT
    d.DishID,
    d.Name AS DishName,
    d.Description,
    d.Price,
    d.PreparationTime,
    d.ImageLink,
    d.CreationDate,
    d.ModificationDate,
    d.CreatedBy,
    d.ModifiedBy,
    d.CategoryID,
    c.Name AS CategoryName
FROM
    Dish d
JOIN
    Category c ON d.CategoryID = c.CategoryID;


-- Drop the view if it exists
DROP VIEW IF EXISTS MenuDishDetails;

-- Create the view again with modifications
CREATE VIEW MenuDishDetails AS
SELECT
    m.MenuID,
    d.DishID,
    d.Name AS DishName,
    d.Description AS DishDescription,
    d.Price,
    d.PreparationTime,
    d.ImageLink,
    md.Status,
    c.CategoryID,
    c.Name AS CategoryName
FROM
    Menu m
JOIN
    MenuDish md ON m.MenuID = md.MenuID
JOIN
    Dish d ON md.DishID = d.DishID
JOIN
    Category c ON d.CategoryID = c.CategoryID;


ALTER TABLE DiningTable
ADD COLUMN CreatedBy INT,
ADD COLUMN ModifiedBy INT,
ADD CONSTRAINT Table_fk_createdby FOREIGN KEY (CreatedBy) REFERENCES User(UserID),
ADD CONSTRAINT Table_fk_modifiedby FOREIGN KEY (ModifiedBy) REFERENCES User(UserID);

CREATE VIEW OrderItemDetails AS
SELECT
    oi.OrderItemID,
    oi.OrderID,
    mo.UserID,
    mo.TableID,
    mo.OrderTime,
    mo.Status AS OrderStatus,
    mo.LocationID,
    oi.DishID,
    d.Name AS DishName,
    oi.Quantity,
    oi.Status AS ItemStatus,
    oi.SpecialRequests
FROM
    OrderItem oi
JOIN
    MealOrder mo ON oi.OrderID = mo.OrderID
JOIN
    Dish d ON oi.DishID = d.DishID;

INSERT INTO User (Name, Role, ContactDetails, Login, Password, LocationID)
VALUES ('Walter Hartwell White', 'Chef', NULL, 'Heisenberg', '$2a$10$QWohBJdKwYpzcy7zxyblfOvXZHBOAUZCgANm3mifH407vm4muwxrC', 1);
INSERT INTO User (Name, Role, ContactDetails, Login, Password, LocationID)
VALUES ('Gustavo Fring', 'Owner', NULL, 'Gus', '$2a$10$kCHHgNCI3WwL/VcbR8xEsOb5nzHmZ0vTd1rT7Dikb0jF3tS5.3IrW', 1);
INSERT INTO User (Name, Role, ContactDetails, Login, Password, LocationID)
VALUES ('Michael Ehrmantraut', 'Waiter', NULL, 'Mike', '$2a$10$wnYmd2JA9Ly/mD/6sMoLCO6Lc3bBgLY2Vval0S13eTk80R4AcTcqG', 1);
-- logins:
-- Heisenberg: BlueCrystal
-- Gus: LosPollos
-- Mike: Bodyguard
