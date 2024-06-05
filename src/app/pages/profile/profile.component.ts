import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthState } from '../../store/auth.reducer';
import { updateProfile } from '../../store/auth.actions';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  profileForm: FormGroup;

  cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<{ auth: AuthState }>
  ) {
    this.profileForm = this.fb.group({
      id: [''],
      login: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('userID');
    this.store.select('auth').subscribe(authState => {
      if (authState.user) {
        this.profileForm.patchValue(authState.user);
      } else {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user) {
          this.profileForm.patchValue(user);
        }
      }
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const updatedUser = this.profileForm.value;
      this.store.dispatch(updateProfile({ user: updatedUser }));
      console.log('Profile updated:', updatedUser);
    }
  }
}
