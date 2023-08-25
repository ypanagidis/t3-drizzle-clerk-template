import { relations } from "drizzle-orm";
import {
  mysqlTable,
  varchar,
  int,
  serial,
  timestamp,
  primaryKey,
} from "drizzle-orm/mysql-core";

export const posts = mysqlTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
  },
  () => ({})
);

export const postRelations = relations(posts, ({ many }) => ({
  comments: many(comments),
  users: many(usersToPosts),
}));

export const comments = mysqlTable("comments", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
  postId: int("postId"),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
}));

export const users = mysqlTable("users", {
  id: serial("id").primaryKey().notNull(),
  firstName: varchar("firstName", { length: 256 }),
  lastName: varchar("lastName", { length: 256 }),
  age: int("age"),
  gender: varchar("sex", { length: 256 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(usersToPosts),
}));

export const usersToPosts = mysqlTable(
  "usersToPosts",
  {
    userId: int("userId"),
    postId: int("postId"),
  },
  (t) => ({
    pk: primaryKey(t.postId, t.userId),
  })
);

export const usersToPostsRelations = relations(usersToPosts, ({ one }) => ({
  post: one(posts, {
    fields: [usersToPosts.postId],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [usersToPosts.userId],
    references: [users.id],
  }),
}));
