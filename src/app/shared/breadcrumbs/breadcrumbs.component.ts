import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})

export class BreadcrumbsComponent implements OnInit {


  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.route.root);
      });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      if (child.snapshot.routeConfig && child.snapshot.routeConfig.data && child.snapshot.routeConfig.data['breadcrumb']) {
        const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
        url += `/${routeURL}`;

        const breadcrumb: Breadcrumb = {
          label: child.snapshot.routeConfig.data['breadcrumb'],
          url: url
        };

        breadcrumbs.push(breadcrumb);

        return this.createBreadcrumbs(child, url, breadcrumbs);
      }
    }

    return breadcrumbs;
  }
}
