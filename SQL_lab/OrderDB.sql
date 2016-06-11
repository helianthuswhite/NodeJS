create database OrderDB default charset utf8;

use OrderDB;

create table Customer(customerNo char(9) not null,
					  customerName varchar(40) not null,
                      telephone varchar(40) not null,
                      address varchar(20) not null,
                      zip char(6) null);
                      
create table Employee(employeeNo char(8) not null,
					  employeeName varchar(10) null,
                      gender char(1) null,
                      birthday datetime null,
                      address varchar(50) null,
                      telephone varchar(20) null,
                      hireDate datetime null,
                      department varchar(30) null,
                      headShip varchar(10) null,
                      salary numeric(10, 0) null);
                      
create table Product(productNo char(9) not null,
					 productName varchar(40) not null,
                     productClass varchar(20) not null,
                     productPrice numeric(7, 2) not null,
                     inStock int null);
                     
create table OrderMaster(orderNo char(12) not null,
						 customerNo char(9) null,
                         employeeNo char(8) null,
                         orderDate datetime null,
                         orderSum numeric(9, 2) null,
                         invoiceNo char(10) null);
                         
create table OrderDetail(orderNo char(12) not null,
						 productNo char(9) null,
                         quantity int null,
                         price numeric(7, 2) null);

INSERT Customer (customerNo, customerName, telephone, address, zip) VALUES ('C20050001', '统一股份有限公司', '022-3566021', '天津市', '220012');
INSERT Customer (customerNo, customerName, telephone, address, zip) VALUES ('C20050002', '兴隆股份有限公司', '022-3562452', '天津市', '220301');
INSERT Customer (customerNo, customerName, telephone, address, zip) VALUES ('C20050003', '上海生物研究室', '010-2121000', '北京市', '108001');
INSERT Customer (customerNo, customerName, telephone, address, zip) VALUES ('C20050004', '五一商厦', '021-4532187', '上海市', '210100');
INSERT Customer (customerNo, customerName, telephone, address, zip) VALUES ('C20060001', '大地商城', '010-1165152', '北京市', '100803');
INSERT Customer (customerNo, customerName, telephone, address, zip) VALUES ('C20060002', '联合股份有限公司', '021-4568451', '上海市', '210100');
INSERT Customer (customerNo, customerName, telephone, address, zip) VALUES ('C20070001', '南昌电脑研制中心', '0791-4412152', '南昌市', '330046');
INSERT Customer (customerNo, customerName, telephone, address, zip) VALUES ('C20070002', '世界技术开发公司', '021-4564512', '上海市', '210230');
INSERT Customer (customerNo, customerName, telephone, address, zip) VALUES ('C20070003', '万事达有限公司', '022-4533141', '天津市', '220400');
INSERT Customer (customerNo, customerName, telephone, address, zip) VALUES ('C20080001', '红度股份有限公司', '010-5421585', '北京市', '100800');
INSERT Employee (employeeNo, employeeName, gender, birthday, address, telephone, hireDate, department, headShip, salary) VALUES ('E2005001', '喻自强', 'M', '1965-04-15 00:00:00', '南京市青海路18号', '13817605008', '1990-02-06 00:00:00', '财务科', '科长', '5800');
INSERT Employee (employeeNo, employeeName, gender, birthday, address, telephone, hireDate, department, headShip, salary) VALUES ('E2005002', '张小梅', 'F', '1973-11-01 00:00:00', '上海市北京路8号', '13607405016', '1991-03-28 00:00:00', '业务科', '职员', '2400');
INSERT Employee (employeeNo, employeeName, gender, birthday, address, telephone, hireDate, department, headShip, salary) VALUES ('E2005003', '张小娟', 'F', '1973-03-06 00:00:00', '上海市南京路66号', '13707305025', '1992-03-28 00:00:00', '业务科', '职员', '2600');
INSERT Employee (employeeNo, employeeName, gender, birthday, address, telephone, hireDate, department, headShip, salary) VALUES ('E2005004', '张露', 'F', '1967-01-05 00:00:00', '南昌市八一路13号', '15907205134', '1990-03-28 00:00:00', '业务科', '科长', '4100');
INSERT Employee (employeeNo, employeeName, gender, birthday, address, telephone, hireDate, department, headShip, salary) VALUES ('E2005005', '张小东', 'M', '1973-09-03 00:00:00', '南昌市阳明路99号', '15607105243', '1992-03-28 00:00:00', '业务科', '职员', '1800');
INSERT Employee (employeeNo, employeeName, gender, birthday, address, telephone, hireDate, department, headShip, salary) VALUES ('E2006001', '陈辉', 'M', '1965-11-01 00:00:00', '南昌市青山路100号', '13607705352', '1990-03-28 00:00:00', '办公室', '主任', '4000');
INSERT Employee (employeeNo, employeeName, gender, birthday, address, telephone, hireDate, department, headShip, salary) VALUES ('E2006002', '韩梅', 'F', '1973-12-11 00:00:00', '上海市浦东大道6号', '13807805461', '1990-11-28 00:00:00', '业务科', '职员', '2600');
INSERT Employee (employeeNo, employeeName, gender, birthday, address, telephone, hireDate, department, headShip, salary) VALUES ('E2006003', '刘风', 'F', '1973-05-21 00:00:00', '江西财经大学5栋', '15907805578', '1991-02-28 00:00:00', '业务科', '职员', '2500');
INSERT Employee (employeeNo, employeeName, gender, birthday, address, telephone, hireDate, department, headShip, salary) VALUES ('E2007001', '吴浮萍', 'M', '1973-09-12 00:00:00', '南昌高新区12号', NULL, '1990-06-28 00:00:00', '业务科', '职员', '2500');
INSERT Employee (employeeNo, employeeName, gender, birthday, address, telephone, hireDate, department, headShip, salary) VALUES ('E2007002', '高代鹏', 'M', '1973-01-02 00:00:00', '南昌高新区56号', NULL, '1991-11-28 00:00:00', '办公室', '文员', '2000');
INSERT Employee (employeeNo, employeeName, gender, birthday, address, telephone, hireDate, department, headShip, salary) VALUES ('E2008001', '陈诗杰', 'M', '1968-01-06 00:00:00', '江西财经大学12栋', NULL, '1990-12-06 00:00:00', '财务科', '出纳', '3200');
INSERT Employee (employeeNo, employeeName, gender, birthday, address, telephone, hireDate, department, headShip, salary) VALUES ('E2008002', '张良', 'M', '1972-02-16 00:00:00', '上海市福州路135号', NULL, '1992-02-28 00:00:00', '业务科', '职员', '2700');
INSERT Employee (employeeNo, employeeName, gender, birthday, address, telephone, hireDate, department, headShip, salary) VALUES ('E2008003', '黄梅莹', 'F', '1972-05-15 00:00:00', '上海市九江路88号', NULL, '1991-02-28 00:00:00', '业务科', '职员', '3100');
INSERT Employee (employeeNo, employeeName, gender, birthday, address, telephone, hireDate, department, headShip, salary) VALUES ('E2008004', '李虹冰', 'F', '1972-10-13 00:00:00', '南昌市中山路1号', NULL, '1990-05-28 00:00:00', '业务科', '职员', '3400');
INSERT Employee (employeeNo, employeeName, gender, birthday, address, telephone, hireDate, department, headShip, salary) VALUES ('E2008005', '张小梅', 'F', '1970-11-06 00:00:00', '深圳阳关大道10号', NULL, '1990-11-18 00:00:00', '财务科', '会计', '5000');
INSERT Product (productNo, productName, productClass, productPrice, inStock) VALUES ('P20050001', '32M DRAM', '内存', '80.70', 80);
INSERT Product (productNo, productName, productClass, productPrice, inStock) VALUES ('P20050002', '17寸显示器', '显示器', '700.00', 96);
INSERT Product (productNo, productName, productClass, productPrice, inStock) VALUES ('P20050003', '120GB硬盘', '存储器', '300.00', 96);
INSERT Product (productNo, productName, productClass, productPrice, inStock) VALUES ('P20050004', '3.5寸软驱', '设备', '35.00', 100);
INSERT Product (productNo, productName, productClass, productPrice, inStock) VALUES ('P20050005', '键盘', '设备', '100.60', 97);
INSERT Product (productNo, productName, productClass, productPrice, inStock) VALUES ('P20060001', 'VGA显示卡', '显示器', '1200.60', 97);
INSERT Product (productNo, productName, productClass, productPrice, inStock) VALUES ('P20060002', '网卡', '设备', '66.00', 95);
INSERT Product (productNo, productName, productClass, productPrice, inStock) VALUES ('P20060003', 'Pentium100CPU', '处理器', '200.00', 96);
INSERT Product (productNo, productName, productClass, productPrice, inStock) VALUES ('P20070001', '1G DDR', '内存', '256.00', 91);
INSERT Product (productNo, productName, productClass, productPrice, inStock) VALUES ('P20070002', '52倍速光驱', '设备', '200.00', 95);
INSERT Product (productNo, productName, productClass, productPrice, inStock) VALUES ('P20070003', '计算机字典', '图书', '100.00', 94);
INSERT Product (productNo, productName, productClass, productPrice, inStock) VALUES ('P20070004', '9600bits/s调制解调', '设备', '320.00', 98);
INSERT Product (productNo, productName, productClass, productPrice, inStock) VALUES ('P20080001', 'Pentium主板', '主板', '890.00', 93);
INSERT Product (productNo, productName, productClass, productPrice, inStock) VALUES ('P20080002', '硕泰克SL-K8AN主板', '主板', '1100.00', 93);
INSERT Product (productNo, productName, productClass, productPrice, inStock) VALUES ('P20080003', '777FT纯平显示器', '显示器', '900.00', 97);
INSERT OrderMaster (orderNo, customerNo, employeeNo, orderDate, orderSum, invoiceNo) VALUES ('200801090001', 'C20050001', 'E2005002', '2008-01-09 00:00:00', '4600.00', 'I000000001');
INSERT OrderMaster (orderNo, customerNo, employeeNo, orderDate, orderSum, invoiceNo) VALUES ('200801090002', 'C20050004', 'E2005003', '2008-01-09 00:00:00', '5746.00', 'I000000002');
INSERT OrderMaster (orderNo, customerNo, employeeNo, orderDate, orderSum, invoiceNo) VALUES ('200802190001', 'C20050001', 'E2005003', '2008-02-19 00:00:00', '5786.00', 'I000000004');
INSERT OrderMaster (orderNo, customerNo, employeeNo, orderDate, orderSum, invoiceNo) VALUES ('200802190002', 'C20070002', 'E2008002', '2008-02-19 00:00:00', '2270.00', 'I000000005');
INSERT OrderMaster (orderNo, customerNo, employeeNo, orderDate, orderSum, invoiceNo) VALUES ('200803010001', 'C20070002', 'E2008001', '2008-03-01 00:00:00', '1800.00', 'I000000006');
INSERT OrderMaster (orderNo, customerNo, employeeNo, orderDate, orderSum, invoiceNo) VALUES ('200803020001', 'C20050004', 'E2008003', '2008-03-02 00:00:00', '1000.00', 'I000000007');
INSERT OrderDetail (orderNo, productNo, quantity, price) VALUES ('200801090001', 'P20050001', 5, '500.00');
INSERT OrderDetail (orderNo, productNo, quantity, price) VALUES ('200801090001', 'P20050002', 3, '500.00');
INSERT OrderDetail (orderNo, productNo, quantity, price) VALUES ('200801090001', 'P20050003', 2, '300.00');
INSERT OrderDetail (orderNo, productNo, quantity, price) VALUES ('200801090002', 'P20060002', 5, '250.00');
INSERT OrderDetail (orderNo, productNo, quantity, price) VALUES ('200801090002', 'P20080001', 5, '280.00');
INSERT OrderDetail (orderNo, productNo, quantity, price) VALUES ('200801090002', 'P20080002', 4, '270.00');
INSERT OrderDetail (orderNo, productNo, quantity, price) VALUES ('200801090002', 'P20080003', 2, '158.00');
INSERT OrderDetail (orderNo, productNo, quantity, price) VALUES ('200801090002', 'P20050001', 5, '130.00');
INSERT OrderDetail (orderNo, productNo, quantity, price) VALUES ('200801090002', 'P20060001', 3, '350.00');
INSERT OrderDetail (orderNo, productNo, quantity, price) VALUES ('200802190001', 'P20060003', 4, '270.00');
INSERT OrderDetail (orderNo, productNo, quantity, price) VALUES ('200802190001', 'P20070001', 2, '158.00');
INSERT OrderDetail (orderNo, productNo, quantity, price) VALUES ('200802190001', 'P20070002', 5, '250.00');
INSERT OrderDetail (orderNo, productNo, quantity, price) VALUES ('200802190001', 'P20070003', 3, '350.00');
INSERT OrderDetail (orderNo, productNo, quantity, price) VALUES ('200802190001', 'P20070004', 2, '330.00');
INSERT OrderDetail (orderNo, productNo, quantity, price) VALUES ('200802190001', 'P20080001', 2, '160.00');
INSERT OrderDetail (orderNo, productNo, quantity, price) VALUES ('200802190001', 'P20080002', 3, '260.00');
INSERT OrderDetail (orderNo, productNo, quantity, price) VALUES ('200802190001', 'P20080003', 1, '330.00');
INSERT OrderDetail (orderNo, productNo, quantity, price) VALUES ('200802190002', 'P20050003', 2, '160.00');
INSERT OrderDetail (orderNo, productNo, quantity, price) VALUES ('200802190002', 'P20050005', 3, '150.00');
INSERT OrderDetail (orderNo, productNo, quantity, price) VALUES ('200802190002', 'P20070001', 3, '500.00');
INSERT OrderDetail (orderNo, productNo, quantity, price) VALUES ('200803010001', 'P20050001', 8, '150.00');
INSERT OrderDetail (orderNo, productNo, quantity, price) VALUES ('200803010001', 'P20070001', 4, '150.00');
INSERT OrderDetail (orderNo, productNo, quantity, price) VALUES ('200803020001', 'P20050001', 2, '100.00');
INSERT OrderDetail (orderNo, productNo, quantity, price) VALUES ('200803020001', 'P20050002', 1, '200.00');
INSERT OrderDetail (orderNo, productNo, quantity, price) VALUES ('200803020001', 'P20070003', 3, '200.00');
