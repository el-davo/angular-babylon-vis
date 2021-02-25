import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VisComponent} from './vis.component';
import {RouterModule, Routes} from '@angular/router';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
    {
        path: '',
        component: VisComponent
    }
];

@NgModule({
    declarations: [VisComponent, VisualizerComponent, TableComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class VisModule {
}
