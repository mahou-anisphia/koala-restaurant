-- Create User table
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

-- Create Dish table
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

-- Create Menu table
CREATE TABLE Menu (
    MenuID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ModificationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create MenuDish table to establish many-to-many relationship between Menu and Dish
CREATE TABLE MenuDish (
    MenuID INT,
    DishID INT,
    Status ENUM('Available', 'Unavailable') NOT NULL,
    PRIMARY KEY (MenuID, DishID),
    FOREIGN KEY (MenuID) REFERENCES Menu(MenuID) ON DELETE CASCADE,
    FOREIGN KEY (DishID) REFERENCES Dish(DishID) ON DELETE CASCADE
);

-- Create Table table
CREATE TABLE DiningTable (
    TableID INT AUTO_INCREMENT PRIMARY KEY,
    Capacity INT NOT NULL,
    Location VARCHAR(255)
);

-- Create Reservation table
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

-- Create Order table
CREATE TABLE MealOrder (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    TableID INT,
    OrderTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Pending', 'Preparing', 'Served', 'Completed') NOT NULL,
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE,
    FOREIGN KEY (TableID) REFERENCES DiningTable(TableID) ON DELETE CASCADE
);

-- Create OrderItem table
CREATE TABLE OrderItem (
    OrderItemID INT AUTO_INCREMENT PRIMARY KEY,
    OrderID INT,
    DishID INT,
    Quantity INT NOT NULL,
    SpecialRequests TEXT,
    FOREIGN KEY (OrderID) REFERENCES MealOrder(OrderID) ON DELETE CASCADE,
    FOREIGN KEY (DishID) REFERENCES Dish(DishID) ON DELETE CASCADE
);

-- Create Receipt table
CREATE TABLE Receipt (
    ReceiptID INT AUTO_INCREMENT PRIMARY KEY,
    OrderID INT,
    Amount DECIMAL(10, 2) NOT NULL,
    PaymentMethod ENUM('Cash', 'Card', 'Online') NOT NULL,
    PaymentTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (OrderID) REFERENCES MealOrder(OrderID) ON DELETE CASCADE
);

-- Create Report table
CREATE TABLE Report (
    ReportID INT AUTO_INCREMENT PRIMARY KEY,
    ReportType ENUM('Daily', 'Monthly', 'Yearly') NOT NULL,
    GeneratedTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Content TEXT
);

-- Create Revenue table
CREATE TABLE Revenue (
    RevenueID INT AUTO_INCREMENT PRIMARY KEY,
    Amount DECIMAL(10, 2) NOT NULL,
    Date DATE NOT NULL
);
