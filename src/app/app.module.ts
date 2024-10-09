import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

// MODULOS ANGULAR MATERIAL
import { MatToolbarModule } from '@angular/material/toolbar';  // Para el navbar
import { MatButtonModule } from '@angular/material/button';    // Botones en el navbar
import { MatCardModule } from '@angular/material/card';        // Para el contenedor del login/registro
import { MatFormFieldModule } from '@angular/material/form-field';  // Campos de formulario
import { MatInputModule } from '@angular/material/input';      // Para los inputs de email y password
import { MatCheckboxModule } from '@angular/material/checkbox'; // Checkbox de "Recordarme"
import { RouterModule } from '@angular/router';                // Para la navegación
import { MatIconModule } from '@angular/material/icon';        // Para iconos si es necesario (opcional)
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Para manejar formularios
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

// COMPONENTES
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { VerificationComponent } from './components/verification/verification.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ErrorPageComponent } from './error-page/error-page.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    ProfileComponent,
    VerificationComponent,
    ResetPasswordComponent,
    ErrorPageComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    // IMPORTACIÓN DE MODULOS ANGULAR MATERIAL
    ReactiveFormsModule,      // Manejo de formularios reactivos
    MatToolbarModule,         // Toolbar para el navbar
    MatButtonModule,          // Botones para el navbar y formularios
    MatCardModule,            // Tarjetas para los formularios
    MatFormFieldModule,       // Campos de formulario
    MatInputModule,           // Inputs para email, contraseña
    MatCheckboxModule,        // Checkbox "Recordarme"
    MatIconModule,            // Iconos (opcional)
    AppRoutingModule,         // Rutas de la aplicación
    RouterModule,             // Necesario para manejar la navegación entre componentes
    MatProgressSpinnerModule, // Muestra un spinner de carga


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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
