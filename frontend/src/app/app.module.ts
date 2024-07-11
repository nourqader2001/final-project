import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AdvicesComponent } from './advices/advices.component';
import { ProductsComponent } from './products/products.component';
import { Signup2Component } from './signup2/signup2.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { GetCategoryComponent } from './get-category/get-category.component';
import { GetProductComponent } from './get-product/get-product.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AddAdviceComponent } from './add-advice/add-advice.component';
import { AddExerciseComponent } from './add-exercise/add-exercise.component';
import { GetAdvicesComponent } from './get-advices/get-advices.component';
import { GetExercisesComponent } from './get-exercises/get-exercises.component';
import { UpdateExerciseComponent } from './update-exercise/update-exercise.component';
import { UpdateAdviceComponent } from './update-advice/update-advice.component';
import { CategoriesComponent } from './categories/categories.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { UpdateProductComponent } from './update-product/update-product.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    AboutusComponent,
    AdvicesComponent,
    ProductsComponent,
    Signup2Component,
    ExercisesComponent,
    ProductDetailsComponent,
    CartComponent,
    DashboardComponent,
    AddCategoryComponent,
    AddProductComponent,
    GetCategoryComponent,
    GetProductComponent,
    WelcomeComponent,
    AddAdviceComponent,
    AddExerciseComponent,
    GetAdvicesComponent,
    GetExercisesComponent,
    UpdateExerciseComponent,
    UpdateAdviceComponent,
    CategoriesComponent,
    UpdateCategoryComponent,
    UpdateProductComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
