export class DatabaseService<T> implements IDatabaseService<T> {
  private repo: IRepository<T>;
  constructor(private _repo: IRepository<T>) {
    this.repo = _repo;
  }

  find(filter?: Partial<T>): Promise<T[]> {
    return this.repo.find(filter);
  }

  findOne(id: number): Promise<T> {
    return this.repo.findOne(id);
  }

  insert(task: T): Promise<T> {
    return this.repo.save(task);
  }

  update(task: T): Promise<T> {
    return this.repo.save(task).then(() => task);
  }

  remove(id: string | number): Promise<any> {
    return this.repo.delete(id).then();
  }
}

export interface IDatabaseService<T> {
  find(filter?: Partial<T>): Promise<T[]>;
  findOne(id: any): Promise<T>;
  insert(task: T): Promise<T>;
  update(task: T): Promise<T>;
  remove(id: any): Promise<void>;
}

export interface IRepository<T> {
  find(filter?): Promise<T[]>;
  findOne(id: any): Promise<T>;
  save(entry: any, options?: any): Promise<T>;
  delete(id: any): Promise<any>;
}
