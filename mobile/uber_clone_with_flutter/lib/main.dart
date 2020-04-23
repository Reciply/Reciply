import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:uber_clone/states/app_state.dart';
import 'screens/home.dart';
//todo add flutter sdk
//added to the feature branch in the new org. repo
//made the repo private for the org.

void main() {
  return runApp(MultiProvider(
    providers: [
      ChangeNotifierProvider.value(
        value: AppState(),
      )
    ],
    child: MyApp(),
  ));
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'uber clone',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Uber clone'),
    );
  }
}
