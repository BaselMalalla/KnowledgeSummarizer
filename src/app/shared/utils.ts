import { Rating, Post } from './interfaces';

export function calculateRatingsAvg(ratings: Rating[]): number {
  if (!ratings || ratings.length === 0) {
    return 0;
  }
  const total = ratings.reduce((acc, rating) => acc + rating.value, 0);
  return total / ratings.length;
}

export function convertFirebaseDate(timestamp: any): string {
  const { seconds, nanoseconds } = timestamp;
  const fireBaseTime = new Date(seconds * 1000 + nanoseconds / 1000000);
  const dateString = fireBaseTime.toDateString();
  const atTime = fireBaseTime.toLocaleTimeString();

  return dateString;
}
