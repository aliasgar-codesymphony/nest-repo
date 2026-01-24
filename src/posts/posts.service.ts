import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './Interfaces/post.interface';
import { NOTFOUND } from 'dns';

@Injectable()
export class PostsService {
  posts: Post[] = [
    {
      id: 1,
      title: 'Fisrt Post',
      content: 'Content of Fisrt Post',
      authorName: 'ABC',
      createdAt: '6/11/2025, 3:45:14 pm',
    },
  ];

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number) {
    const singlePost = this.posts.find((post) => post.id === id);
    if (!singlePost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return singlePost;
  }

  create(createData: Omit<Post, 'id' | 'createdAt'>): Post {
    const newPost: Post = {
      id: this.getNextId(),
      ...createData,
      createdAt: new Date().toLocaleString(),
    };
    this.posts.push(newPost);

    return newPost;
  }

  getNextId(): number {
    //console.log(this.posts.find((post) => post.id));
    const ids = [0];
    this.posts.forEach((i) => {
      ids.push(i.id);
    });
    return Math.max(...ids) + 1;
  }

  update(
    id: number,
    updateData: Partial<Omit<Post, 'id' | 'createdAt'>>,
  ): Post {
    const index = this.posts.findIndex((post) => post.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with ID: ${id} not found`);
    }
    this.posts[index] = {
      ...this.posts[index],
      ...updateData,
      updatedAt: new Date().toLocaleString(),
    };

    return this.posts[index];
  }

  remove(id: number): { message: string } {
    const index = this.posts.findIndex((post) => post.id === id);

    if (index === -1) {
      throw new NotFoundException(`User with ID: ${id} not found`);
    } else {
      this.posts.splice(index, 1);
      return { message: `User with id: ${id} deleted` };
    }
  }
}
