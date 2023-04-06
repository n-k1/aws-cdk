"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iam = require("aws-cdk-lib/aws-iam");
const kms = require("aws-cdk-lib/aws-kms");
const secretsmanager = require("aws-cdk-lib/aws-secretsmanager");
const cdk = require("aws-cdk-lib");
const integ_tests_alpha_1 = require("@aws-cdk/integ-tests-alpha");
const aws_rds_1 = require("aws-cdk-lib/aws-rds");
const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-cdk-rds-integ-secret-rotation');
const kmsKey = new kms.Key(stack, 'DbSecurity');
const secret = new aws_rds_1.DatabaseSecret(stack, 'test-secret', {
    username: 'admin',
});
const cluster = new aws_rds_1.ServerlessCluster(stack, 'Database', {
    engine: aws_rds_1.DatabaseClusterEngine.AURORA_MYSQL,
    credentials: aws_rds_1.Credentials.fromSecret(secret),
    storageEncryptionKey: kmsKey,
});
secret.addRotationSchedule('test-schedule', {
    hostedRotation: secretsmanager.HostedRotation.mysqlSingleUser(),
});
cluster.grantDataApiAccess(new iam.AccountRootPrincipal());
cluster.grantDataApiAccess(new iam.ServicePrincipal('ecs-tasks.amazonaws.com'));
new integ_tests_alpha_1.IntegTest(app, 'cdk-rds-integ-secret-rotation', {
    testCases: [stack],
});
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWcuc2VydmVybGVzcy1jbHVzdGVyLXNlY3JldC1yb3RhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImludGVnLnNlcnZlcmxlc3MtY2x1c3Rlci1zZWNyZXQtcm90YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBMkM7QUFDM0MsMkNBQTJDO0FBQzNDLGlFQUFpRTtBQUNqRSxtQ0FBbUM7QUFDbkMsa0VBQXVEO0FBQ3ZELGlEQUE0RztBQUU1RyxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMxQixNQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLG1DQUFtQyxDQUFDLENBQUM7QUFFdEUsTUFBTSxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztBQUNoRCxNQUFNLE1BQU0sR0FBRyxJQUFJLHdCQUFjLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRTtJQUN0RCxRQUFRLEVBQUUsT0FBTztDQUNsQixDQUFDLENBQUM7QUFFSCxNQUFNLE9BQU8sR0FBRyxJQUFJLDJCQUFpQixDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUU7SUFDdkQsTUFBTSxFQUFFLCtCQUFxQixDQUFDLFlBQVk7SUFDMUMsV0FBVyxFQUFFLHFCQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUMzQyxvQkFBb0IsRUFBRSxNQUFNO0NBQzdCLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLEVBQUU7SUFDMUMsY0FBYyxFQUFFLGNBQWMsQ0FBQyxjQUFjLENBQUMsZUFBZSxFQUFFO0NBQ2hFLENBQUMsQ0FBQztBQUVILE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7QUFDM0QsT0FBTyxDQUFDLGtCQUFrQixDQUFDLElBQUksR0FBRyxDQUFDLGdCQUFnQixDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQztBQUVoRixJQUFJLDZCQUFTLENBQUMsR0FBRyxFQUFFLCtCQUErQixFQUFFO0lBQ2xELFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQztDQUNuQixDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBpYW0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG5pbXBvcnQgKiBhcyBrbXMgZnJvbSAnYXdzLWNkay1saWIvYXdzLWttcyc7XG5pbXBvcnQgKiBhcyBzZWNyZXRzbWFuYWdlciBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc2VjcmV0c21hbmFnZXInO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IEludGVnVGVzdCB9IGZyb20gJ0Bhd3MtY2RrL2ludGVnLXRlc3RzLWFscGhhJztcbmltcG9ydCB7IENyZWRlbnRpYWxzLCBTZXJ2ZXJsZXNzQ2x1c3RlciwgRGF0YWJhc2VDbHVzdGVyRW5naW5lLCBEYXRhYmFzZVNlY3JldCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1yZHMnO1xuXG5jb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xuY29uc3Qgc3RhY2sgPSBuZXcgY2RrLlN0YWNrKGFwcCwgJ2F3cy1jZGstcmRzLWludGVnLXNlY3JldC1yb3RhdGlvbicpO1xuXG5jb25zdCBrbXNLZXkgPSBuZXcga21zLktleShzdGFjaywgJ0RiU2VjdXJpdHknKTtcbmNvbnN0IHNlY3JldCA9IG5ldyBEYXRhYmFzZVNlY3JldChzdGFjaywgJ3Rlc3Qtc2VjcmV0Jywge1xuICB1c2VybmFtZTogJ2FkbWluJyxcbn0pO1xuXG5jb25zdCBjbHVzdGVyID0gbmV3IFNlcnZlcmxlc3NDbHVzdGVyKHN0YWNrLCAnRGF0YWJhc2UnLCB7XG4gIGVuZ2luZTogRGF0YWJhc2VDbHVzdGVyRW5naW5lLkFVUk9SQV9NWVNRTCxcbiAgY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzLmZyb21TZWNyZXQoc2VjcmV0KSxcbiAgc3RvcmFnZUVuY3J5cHRpb25LZXk6IGttc0tleSxcbn0pO1xuXG5zZWNyZXQuYWRkUm90YXRpb25TY2hlZHVsZSgndGVzdC1zY2hlZHVsZScsIHtcbiAgaG9zdGVkUm90YXRpb246IHNlY3JldHNtYW5hZ2VyLkhvc3RlZFJvdGF0aW9uLm15c3FsU2luZ2xlVXNlcigpLFxufSk7XG5cbmNsdXN0ZXIuZ3JhbnREYXRhQXBpQWNjZXNzKG5ldyBpYW0uQWNjb3VudFJvb3RQcmluY2lwYWwoKSk7XG5jbHVzdGVyLmdyYW50RGF0YUFwaUFjY2VzcyhuZXcgaWFtLlNlcnZpY2VQcmluY2lwYWwoJ2Vjcy10YXNrcy5hbWF6b25hd3MuY29tJykpO1xuXG5uZXcgSW50ZWdUZXN0KGFwcCwgJ2Nkay1yZHMtaW50ZWctc2VjcmV0LXJvdGF0aW9uJywge1xuICB0ZXN0Q2FzZXM6IFtzdGFja10sXG59KTtcblxuYXBwLnN5bnRoKCk7XG4iXX0=