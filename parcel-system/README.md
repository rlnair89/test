# Parcel Delivery System

This is an Angular-based Parcel Delivery System that allows users to manage parcel listings and department information. The application includes features for viewing parcels, categorized by department (e.g., "Mail," "Regular," "Heavy"), adding an removing departments. The application uses Bootstrap and Angular Material for responsive and professional-looking UI.

# Table of Contents

•	Features

•	Installation

•	Usage

•	Technologies

# Features

•	View a list of parcels with details like recipient name, address, weight, and department.
•	Add new departments dynamically, which reflect immediately in the parcel listing.
•	Organized into different categories (Mail, Regular, Heavy) based on parcel weight.
•	Responsive UI using Bootstrap and Angular Material for a modern look.
•	Basic routing for navigating between "Home" and "Department Management" pages.

# Installation

1.	Clone the repository:
   
    git clone https://github.com/yourusername/parcel-delivery-system.git
    cd parcel-delivery-system
  	
2.	Install dependencies:

    npm install
  	
3.	Run the application:
   
    ng serve
    The application should now be running at http://localhost:4200.
  	
4.	To Start the backend: 

    node Server.js 

# Usage

1.	Viewing Parcels:
  o	The main view displays a table of parcels categorized by department.
  o	Each parcel entry includes recipient details and department type.
2.	Adding a Department:
  o	Navigate to the Department Management page.
  o	Add a department name, and the new department should appear in the parcel listing page.
3.	Routing:
  o	Click on the "Home" tab to return to the parcel list.
  o	Use the "Department Management" tab to add new departments.

# Technologies

•	Angular - Framework for building the application.

•	Angular Material - UI component library for Angular.

•	Bootstrap - CSS framework for responsive design.

•	TypeScript - Programming language used within Angular.


