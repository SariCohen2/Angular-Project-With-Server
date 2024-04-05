import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { RouterModule, Route } from "@angular/router";
import { VolunteersEditingComponent } from "./volunteers-management/volunteers-editing/volunteers-editing.component";
import { VolunteersListComponent } from "./volunteers-management/volunteers-list/volunteers-list.component";
import { SchedulingComponent } from "./placement-volunteers/scheduling/scheduling.component";
import { HttpClientModule } from "@angular/common/http";
import { VolunteerService } from "./volunteers-management/volunteer.service";
import { PlacementVolunteersModule } from "./placement-volunteers/scheduling.module";
import { VolunteersManagementModule } from "./volunteers-management/volunteers-management.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./general/home/home.component";
import { GeneralModule } from "./general/general.module";
const APP_ROUTES: Route[] = [
    { path: "", component: HomeComponent },
    { path: "schedule", component: SchedulingComponent },
    { path: "list", component: VolunteersListComponent },
    { path: "edit", component: VolunteersEditingComponent },
    { path: "**", component: HomeComponent }
];
@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, VolunteersManagementModule, GeneralModule, PlacementVolunteersModule, HttpClientModule, RouterModule.forRoot(APP_ROUTES)],
    providers: [VolunteerService],
    bootstrap: [AppComponent]
})
export class AppModule {


}

