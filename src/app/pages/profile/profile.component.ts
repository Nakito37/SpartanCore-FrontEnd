import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider'; 

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ButtonModule,

    MatButtonModule,
    MatIcon,
    MatDividerModule,

  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
