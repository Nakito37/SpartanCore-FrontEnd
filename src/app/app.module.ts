import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

// MODULOS ANGULAR MATERIAL
import { MatToolbarModule } from '@angular/material/toolbar';  
import { MatButtonModule } from '@angular/material/button';   
import { MatCardModule } from '@angular/material/card';   
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';    
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { RouterModule } from '@angular/router';         
import { MatIconModule } from '@angular/material/icon';    
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


// MODULOS PRIMENG
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import {DialogModule} from 'primeng/dialog'
import { DialogService } from 'primeng/dynamicdialog';

// COMPONENTES
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { VerificationComponent } from './components/verification/verification.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ErrorPageComponent } from './error-page/error-page.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { SessionAlertComponent } from './components/session-alert/session-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    VerificationComponent,
    ResetPasswordComponent,
    ErrorPageComponent,
    VerifyEmailComponent,
    SessionAlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    // IMPORTACIÓN DE MODULOS ANGULAR MATERIAL
    ReactiveFormsModule,      
    MatToolbarModule,       
    MatButtonModule,          
    MatCardModule,          
    MatFormFieldModule,       
    MatInputModule,          
    MatCheckboxModule,       
    MatIconModule,           
    AppRoutingModule,        
    RouterModule,          
    MatProgressSpinnerModule, 


    // IMPORTACIÓN DE MODULOS PRIMENG
    MenubarModule,
    ButtonModule,
    TieredMenuModule,
    ToolbarModule,
    AvatarModule,
    TooltipModule,
    CardModule,
    CarouselModule,
    DialogModule


  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    DialogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
