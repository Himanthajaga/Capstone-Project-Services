module.exports = {
  apps : [
    {
        name   : "cloud-sql-auth-proxy",
        script : "./cloud-sql-proxy capstone-project-490416:asia-southeast1:mysql-vm capstone-project-490416:asia-southeast1:postgres-vm --private-ip",
        log_file: "./logs/cloud-sql-auth-proxy-out.log",
    },
      {
    name   : "Enrollment-Service",
    script : "java -jar ./Enrollment-Service/target/Enrollment-Service-1.0.0.jar",
    log_file: "./logs/enrollment-service-out.log",
    instances: 2
  },
    {
      name   : "program-Service",
      script : "java -jar ./program-Service/target/Program-Service-1.0.0.jar",
      log_file: "./logs/program-service-out.log",
      instances: 2
    },
    {
      name   : "Student-Service",
      script : "java -jar ./Student-Service/target/Student-Service-1.0.0.jar",
      log_file: "./logs/student-service-out.log",
      instances: 2
    }
  ],
}
