import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [HttpClientModule], // Include HttpClientModule here if not included in component imports
}).catch((err) => console.error(err));
