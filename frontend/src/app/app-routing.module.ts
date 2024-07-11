import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AdvicesComponent } from './advices/advices.component';
import { ProductsComponent } from './products/products.component';
import { Signup2Component } from './signup2/signup2.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { GetCategoryComponent } from './get-category/get-category.component';
import { GetProductComponent } from './get-product/get-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AddAdviceComponent } from './add-advice/add-advice.component';
import { AddExerciseComponent } from './add-exercise/add-exercise.component';
import { GetAdvicesComponent } from './get-advices/get-advices.component';
import { GetExercisesComponent } from './get-exercises/get-exercises.component';
import { UpdateExerciseComponent } from './update-exercise/update-exercise.component';
import { UpdateAdviceComponent } from './update-advice/update-advice.component';
import { CategoriesComponent } from './categories/categories.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { AuthGuard } from './shared/auth.guard';
import { UpdateProductComponent } from './update-product/update-product.component';


const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {path : 'home',component:HomeComponent,canActivate: [AuthGuard]},
  {path: 'aboutus',component:AboutusComponent},
  {path:'advices',component:AdvicesComponent},
  {path:'products/:categoryId',component:ProductsComponent},
  {path:'signup2',component:Signup2Component},
  {path:'exercises',component:ExercisesComponent},
  {path:'product-details/:productId',component:ProductDetailsComponent},
  {path:'cart',component:CartComponent},
  {path:'add-category',component:AddCategoryComponent,canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path:'add-product',component:AddProductComponent,canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path:'get-categories',component:GetCategoryComponent,canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path:'get-products',component:GetProductComponent,canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path:'dashboard',component:DashboardComponent,canActivate: [AuthGuard], data: { roles: ['admin'] } },
  {path:'welcome',component:WelcomeComponent},
  {path:'add_advice',component:AddAdviceComponent,canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path:'add_exercise',component:AddExerciseComponent,canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path:'get_advices',component:GetAdvicesComponent,canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path:'get_exercises',component:GetExercisesComponent,canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path:'update_exercise/:id',component:UpdateExerciseComponent,canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path:'update_advice/:id',component:UpdateAdviceComponent,canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path:'categories',component:CategoriesComponent},
  {path:'update_category/:id',component:UpdateCategoryComponent,canActivate: [AuthGuard], data: { roles: ['admin'] }},
  // { path: '**', redirectTo: '/categories' }
  // { path: '**', redirectTo: '/products' }, // Wildcard route for a 404 page
  {path:'update_product/:id',component:UpdateProductComponent,canActivate: [AuthGuard], data: { roles: ['admin'] }}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
