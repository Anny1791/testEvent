import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbLayoutModule, NbSelectModule, NbSidebarModule, NbThemeModule, NbTreeGridModule} from '@nebular/theme';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { EventCategoryComponent } from './components/event-category/event-category.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AppComponent, EventCategoryComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbThemeModule,
    NbThemeModule.forRoot(),
    RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbLayoutModule,
    NbSidebarModule, // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    NbCardModule,
    GraphQLModule,
    HttpClientModule,
    NbIconModule,
    NbEvaIconsModule,
    NbSelectModule,
    NbInputModule,
    NbActionsModule,
    NbTreeGridModule,
    NbCheckboxModule,



  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
