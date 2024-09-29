import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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


// MODULOS PRIMENG


// MODULOS DE COMPONENTES
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PublicationComponent } from './pages/publication/publication.component';
import { VerificationComponent } from './components/verification/verification.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    PrincipalComponent,
    ProfileComponent,
    PublicationComponent,
    VerificationComponent,
    ResetPasswordComponent,
    ErrorPageComponent
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
    RouterModule              // Necesario para manejar la navegación entre componentes


    // IMPORTACIÓN DE MODULOS PRIMENG
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
