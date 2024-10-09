import { Component, ElementRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CarouselPageEvent } from 'primeng/carousel';
import { TabViewModule } from 'primeng/tabview';
import {DividerModule } from 'primeng/divider'
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CardModule,
    CarouselModule,
    TabViewModule,
    DividerModule,
    ButtonModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {  
  @ViewChild('miElemento') elemento: ElementRef | null = null;
  estadoAnimacion: string = 'hidden';
  currentDescription: string = '';
  tabs: { title: string, content: string }[] = [];


  // Información  Carousel
  slides = [
    {
      image: '/assets/gym01.jpg',
      alt: 'Imagen 01',
      title: 'Entrenamiento de atletas',
      subtitle: '',
      description: 'Pon a prueba tus habilidades y establece nuevas rutinas'
    },
    {
      image: '/assets/cth01.jpg',
      alt: 'Imagen 02',
      title: 'Empieza en cualquier lugar',
      subtitle: '',
      description: 'Da el primer paso sin necesidad de un gimnasio'
    },
  ];
  

  constructor(private cdr: ChangeDetectorRef) { }

  // Información de los TabsView
  ngOnInit() {
    this.tabs = [
        { title: 'Calistenia',
         content: `
         <h2 class="tab-title">Calistenia</h2>
         <p class="tab-paragraph">
         La calistenia es un método de entrenamiento que utiliza el peso corporal.
         Empleando ejercicios como flexiones, dominadas, fondos, etc
         </p>
         <ul class="tab-list">
         <li>Se puede practicar en cualquier lugar sin necesidad de equipo adicional.</li>
         <li>Impacta en la fuerza funcional logrando mayor resistencia y agilidad.</li>
         <li>Existen varios ejercicios para entrenar sin equipo.</li>
       </ul>
         <div class="image-container"> 
         <img src="/assets/cthInf.png" alt="Calistenia" class="tab-image">
         </div>
         <p class="tab-paragraph">¡Empieza tu cambio físico. Sin equipo, sin excusas!</p>
       ` 
        },
        { 
          title: 'Gimnasio', 
          content: `
          <h2 class="tab-title">Entrenamiento de Gimnasio</h2>
          <p class="tab-paragraph">
          Se trata de una disciplina de entrenamiento utilizando equipo como barras, mancuernas, etc.
          pudiendo aumentar gradualmente la dificultad y progreso.
          </p>
          <ul class="tab-list">
            <li>Se trabaja la mayor parte de los músculos del cuerpo.</li>
            <li>Impacta en la fuerza bruta e hipertrófia.</li>
            <li>Se exige una mayor disciplina para comenzar.</li>
          </ul>
          <div class="image-container"> 
          <img src="/assets/gymInf02.jpg" alt="Gimnasio" class="tab-image">
          </div>
          <p class="tab-paragraph">¡Pon a prueba tus límites y mejora tus resultados en gran medida!</p>
        `  
        },
        { 
          title: 'Más', 
          content: `
          <h2 class="tab-title">Conoce más dentro del sitio</h2>
          <p class="tab-paragraph">
          Ambos tipos de entrenamiento dependerán de los resultados que quieras obtener. Pero
          tambien influye tu capacidad para disciplinarte y alimentarte sanamente.
          </p>
          <div class="image-container"> 
          <img src="/assets/vsInf.png" alt="versus" class="tab-image">
          </div>
          <p class="tab-paragraph">
          <b><a href="/login">Ingresa ahora</a></b> para encontrar o crear contenido sin gastar dinero.
          </p>
        ` 
        }
    ];
}

  ngAfterViewInit() {
    if (this.elemento) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.estadoAnimacion = 'visible';
          } else {
            this.estadoAnimacion = 'hidden';
          }
          this.cdr.detectChanges(); // Force change detection after updating animation state
        });
      }, { threshold: 0.1 });

      observer.observe(this.elemento.nativeElement);
    }
    this.updateDescription({ page: 0 }); // Initialize with the first description
    this.cdr.detectChanges(); // Force change detection after initial updates
  }

  updateDescription(event: CarouselPageEvent) {
    const index = event.page !== undefined ? event.page : 0;
    this.currentDescription = this.slides[index].description;
    this.cdr.detectChanges(); // Force change detection after updating description
  }

}
