import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  projectStatuses = ['Stable', 'Critical', 'Finished'];
  takenNames = ['test'];
  projectForm : FormGroup;
  project = {
    'name': '',
    'email': '',
    'status': ''
  }

  submitted = false;

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'name': new FormControl('', [Validators.required], this.nameValidator.bind(this)),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'status': new FormControl('Stable')
    });
  }
  onSubmit() {
    console.log(this.projectForm);

    this.submitted = true;
    this.project.name = this.projectForm.value.name;
    this.project.email = this.projectForm.value.email;
    this.project.status = this.projectForm.value.status;

  }

  // nameValidator(control: FormControl): {[s: string]: boolean} {
  //   if (this.takenNames.indexOf(control.value) !== -1) {
  //     return { 'takenName': true };
  //   }

  //   return null;
  // }

  nameValidator(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if(this.takenNames.indexOf(control.value) !== -1){
          resolve({'takenName': true})
        }
        
        resolve(null)
      }, 1500)
    })

    return promise;
  }
}
