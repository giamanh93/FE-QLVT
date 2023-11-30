import {Component, OnInit} from '@angular/core';
import {Event, RouterEvent, Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs';
import {menus} from './sidebar-routes.config';
// import { menus } from './sidebar-routes.config';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  menuItems: any[] = [];

  constructor(
    private router: Router,
  ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((e: any) => {
      const pathname = window.location.pathname;
      if (this.menuItems.length > 0) {
        this.parseObjectProperties(this.menuItems, e.url);
        this.menuItems = [...this.menuItems];
        localStorage.setItem('menuItems', JSON.stringify(this.menuItems));
      } else {
        this.menuItems = menus.filter(menuItem => menuItem);
      }

    });
  }

  ngOnInit() {
    const pathname = window.location.pathname;
    this.menuItems = menus.filter(menuItem => menuItem);
    this.parseObjectProperties(this.menuItems, pathname);
    this.menuItems = [...this.menuItems];
  }

  parseObjectProperties(obj: any[], pathname: string = '') {
    for (const k of obj) {
      if (k.routerLink) {
        // active menu con
        if (k.isExternalLink) {
          if (k.routerLink && pathname.includes(k.routerLink)) {
            k.styleClass = 'parent_active';
          } else {
            k.styleClass = 'parent_no_active';
          }
        } else {
          if (k.routerLink && pathname.includes(k.routerLink)) {
            console.log(pathname);
            console.log(k.routerLink);
            k.styleClass = 'active';
          } else {
            k.styleClass = 'no-active';
          }
        }

      } else {
        if (k.code && pathname && pathname.split('/').indexOf(k.code) > -1 && k.class === 'navigation-header') {
          k.styleClass = 'parent_active';
        } else {
          k.styleClass = 'parent_no_active';
        }
      }

      if (k.hasOwnProperty('items') && Array.isArray(k.items) && k.items.length > 0) {
        this.parseObjectProperties(k.items, pathname);
      }
    }
  }


}
