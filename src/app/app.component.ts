import { Component , OnInit } from '@angular/core';
import { EmployeesService } from './employees.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface Employee {
  id: number;
  name: string;
  email: string;
  mobile: number;
  landline: number;
  website: string;
  address: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  employees: Employee[];
  selectedEmployee: Employee | null = null;
  title = 'AddressBook';
  data: any;
  // public employeeService: EmployeesService
 
  constructor(private employeeService: EmployeesService,private formBuilder: FormBuilder) {
    this.employees = employeeService.getAllEmployees();
  }
  form!: FormGroup;
  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required,Validators.pattern('^[ a-zA-Z]*$'), Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email,   Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      mobile: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      landline: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      website: ['', [Validators.required, Validators.pattern('https?://.+')]],
      address: ['', [Validators.required]],
    });
  }

  name = '';
  email = '';
  mobile = '';
  landline = '';
  website = '';
  address = '';

  showform = false;
  showdetailsright = false;
  showdetailsleft = true;

  showdetails() {
    this.showform = false;
  }
  editdelete = false;
  userlistitem(employee: Employee) {
    this.selectedEmployee = employee;
    this.showdetailsright= true;
    this.editdelete = true;
    this.showform = false;
  }

  showForm() {
    this.showform = true;
    this.showdetailsright = false;
    this. editdelete = false;
    this.form.reset();
    this.add=true;
    this.update=false;
   
  }

  addSubmit() {
    if (this.form.valid) {
      this.data = this.form.value;
      this.employeeService.addEmployee(this.data)
      this.selectedEmployee = this.data;
      this.form.reset();
  
      this.showform = false;
      this.showdetailsleft = true;
      this.showdetailsright = true;
      this.editdelete = true;
  }
  }
  deleteSelectedEmployee() {
    if (this.selectedEmployee) {
      const deleted = this.employeeService.deleteEmployee(this.selectedEmployee.id);
      this.employees = this.employeeService.getAllEmployees();
      if (deleted) {
        console.log("delete")
      this.selectedEmployee = null;
      this.showdetailsright = false;
      this.editdelete = false;
  } 
}
  }
  add=true;
  update=false;
  editEmployee(employee: Employee) {
    // Set the selected data in the form controls for editing
    this.form.setValue({
      name: employee.name,
      email: employee.email,
      mobile: employee.mobile,
      landline: employee.landline,
      website: employee.website,
      address: employee.address,
    });
      this.showform = true;
    this.showdetailsright = false;
    this.editdelete = false;
    this.add=false;
    this.update=true;
  }

  updateEmployeeData() {
   
    if (this.form.valid && this.selectedEmployee) {
  
      this.selectedEmployee.name = this.form.value.name;
      this.selectedEmployee.email = this.form.value.email;
      this.selectedEmployee.mobile = +this.form.value.mobile;
      this.selectedEmployee.landline = +this.form.value.landline;
      this.selectedEmployee.website = this.form.value.website;
      this.selectedEmployee.address = this.form.value.address;
  
      console.log(this.selectedEmployee)
      this.employeeService.updateEmployee(this.selectedEmployee)


      
      this.showform = false;
      this.showdetailsleft = true;
      this.showdetailsright = true;
      this.editdelete=true;
    }
  }

 

onSubmit() {
  console.log("form is submitted");
  if (this.form.valid) {
    // Form is valid, do something with the data
    const formData = this.form.value;
    console.log('Form Data:', formData);
}
}
}
// editEmployee(employee: Employee) {
//   this.selectedEmployee = employee;
//   this.showform = true;
//   this.showdetailsleft = false;
//   this.showdetailsright = true;
// }

// updateEmployee() {
//   if (this.selectedEmployee) {
//     if (this.employeeService.updateEmployee(this.selectedEmployee)) {
//       this.selectedEmployee = null;
//       this.showform = false;
//       this.showdetailsleft = true;
//       this.showdetailsright = true;
//     }
//   }
// }
// }