import { Component } from 'aframe';

export type ComponentDef<T> = T & Partial<Component> & ThisType<T & Component>
