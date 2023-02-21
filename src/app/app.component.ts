import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUserNames = ['abc', 'def'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        //The required validator don't have parenthesis after it because you don't want to execute this method.
        //It is a static method made available by validators here.Instead, you only want to pass the reference to this method.
        //Angular will execute the method whenever it detects that the input of this form control changed.
        //So it just needs to have a reference on what it should execute at this point of time.So this is the required validator.
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  //A validator in the end is just a function which gets executed by angular automatically
  //when it checks the validity of the form control and it checks that validity whenever you change that control.
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }
}
