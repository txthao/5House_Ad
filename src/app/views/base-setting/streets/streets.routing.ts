import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { StreetEditComponent } from './street-edit/street-edit.component';
import { StreetCreateComponent } from './street-create/street-create.component';
import { StreetIndexComponent } from './street-index/street-index.component';
import { StreetsComponent } from './streets.component';
import { StreetAddComponent } from './street-add/street-add.component';

const routes: Routes = [{
    path: '',
    component: StreetsComponent,
    data: { title: 'Streets' },
    children: [
        {
            path: '',
            component: StreetIndexComponent,
            data: { title: '' },
        },
        {
            path: 'create',
            component: StreetCreateComponent,
            data: { title: 'Add Streets' }
        },
        {
            path: 'add',
            component: StreetAddComponent,
            data: { title: 'Add Streets To State' }
        },
        {
            path: ':id',
            component: StreetEditComponent,
            data: { title: 'Edit Streets' }
        },
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class StreetsRoutingModule {
}
